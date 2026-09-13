import Foundation
import Network

final class StaticFileServer {
  private final class ResumeBox: @unchecked Sendable {
    private let lock = NSLock()
    private var resumed = false

    func markResumed() -> Bool {
      lock.lock()
      defer { lock.unlock() }
      if resumed { return false }
      resumed = true
      return true
    }
  }

  enum ServerError: LocalizedError {
    case unavailablePort(Int)
    case invalidRoot(String)

    var errorDescription: String? {
      switch self {
      case .unavailablePort(let port):
        return "本地端口 \(port) 无法使用"
      case .invalidRoot(let path):
        return "无法读取本地目录：\(path)"
      }
    }
  }

  private let rootURL: URL
  private let queue = DispatchQueue(label: "local.board.static-server")
  private var listener: NWListener?
  private var activeConnections: [ObjectIdentifier: NWConnection] = [:]

  init(rootURL: URL) {
    self.rootURL = rootURL.standardizedFileURL
  }

  func start(port: Int) async throws {
    let rootPath = rootURL.path
    guard FileManager.default.fileExists(atPath: rootPath) else {
      throw ServerError.invalidRoot(rootPath)
    }

    stop()

    let params = NWParameters.tcp
    params.allowLocalEndpointReuse = true

    guard let nwPort = NWEndpoint.Port(rawValue: UInt16(port)) else {
      throw ServerError.unavailablePort(port)
    }

    let listener = try NWListener(using: params, on: nwPort)
    listener.newConnectionHandler = { [weak self] connection in
      self?.handle(connection: connection)
    }

    try await withCheckedThrowingContinuation { continuation in
      let resumeBox = ResumeBox()

      listener.stateUpdateHandler = { state in
        switch state {
        case .ready:
          guard resumeBox.markResumed() else { return }
          continuation.resume()
        case .failed:
          guard resumeBox.markResumed() else { return }
          continuation.resume(throwing: ServerError.unavailablePort(port))
        default:
          break
        }
      }

      listener.start(queue: queue)
    }

    self.listener = listener
  }

  func stop() {
    activeConnections.values.forEach { $0.cancel() }
    activeConnections.removeAll()
    listener?.cancel()
    listener = nil
  }

  private func handle(connection: NWConnection) {
    let key = ObjectIdentifier(connection)
    activeConnections[key] = connection
    connection.start(queue: queue)
    receiveRequest(on: connection, key: key, buffer: Data())
  }

  private func receiveRequest(on connection: NWConnection, key: ObjectIdentifier, buffer: Data) {
    connection.receive(minimumIncompleteLength: 1, maximumLength: 32 * 1024) { [weak self] data, _, isComplete, error in
      guard let self else {
        connection.cancel()
        return
      }

      if error != nil {
        self.activeConnections[key] = nil
        connection.cancel()
        return
      }

      var nextBuffer = buffer
      if let data {
        nextBuffer.append(data)
      }

      if let request = self.parseRequest(from: nextBuffer) {
        self.respond(to: request, on: connection, key: key)
        return
      }

      if isComplete || nextBuffer.count >= 32 * 1024 {
        self.respondNotFound(on: connection, key: key)
        return
      }

      self.receiveRequest(on: connection, key: key, buffer: nextBuffer)
    }
  }

  private func parseRequest(from data: Data) -> (method: String, path: String)? {
    guard let text = String(data: data, encoding: .utf8) else { return nil }
    guard let headerRange = text.range(of: "\r\n\r\n") ?? text.range(of: "\n\n") else { return nil }
    let header = String(text[..<headerRange.lowerBound])
    guard let requestLine = header.split(whereSeparator: \.isNewline).first else { return nil }
    let parts = requestLine.split(separator: " ")
    guard parts.count >= 2 else { return nil }
    return (String(parts[0]), String(parts[1]))
  }

  private func respond(to request: (method: String, path: String), on connection: NWConnection, key: ObjectIdentifier) {
    let method = request.method.uppercased()
    guard method == "GET" || method == "HEAD" else {
      send(status: "405 Method Not Allowed", body: Data(), contentType: "text/plain; charset=utf-8", on: connection, key: key, method: method)
      return
    }

    guard let fileURL = resolveFileURL(for: request.path) else {
      respondNotFound(on: connection, key: key, method: method)
      return
    }

    do {
      let body = try Data(contentsOf: fileURL)
      let mime = contentType(for: fileURL.pathExtension)
      send(status: "200 OK", body: body, contentType: mime, on: connection, key: key, method: method)
    } catch {
      respondNotFound(on: connection, key: key, method: method)
    }
  }

  private func resolveFileURL(for rawPath: String) -> URL? {
    let pathPart = rawPath.split(separator: "?", maxSplits: 1, omittingEmptySubsequences: false).first.map(String.init) ?? rawPath
    let decodedPath = pathPart.removingPercentEncoding ?? pathPart
    let trimmed = decodedPath.hasPrefix("/") ? String(decodedPath.dropFirst()) : decodedPath

    var target = rootURL.appendingPathComponent(trimmed, isDirectory: false)
    if decodedPath.hasSuffix("/") || FileManager.default.fileExists(atPath: target.path, isDirectory: nil) && isDirectory(target) {
      target = target.appendingPathComponent("index.html", isDirectory: false)
    }

    let standardized = target.standardizedFileURL
    guard standardized.path.hasPrefix(rootURL.path) else { return nil }
    guard FileManager.default.fileExists(atPath: standardized.path) else { return nil }
    return standardized
  }

  private func isDirectory(_ url: URL) -> Bool {
    var isDirectory: ObjCBool = false
    FileManager.default.fileExists(atPath: url.path, isDirectory: &isDirectory)
    return isDirectory.boolValue
  }

  private func respondNotFound(on connection: NWConnection, key: ObjectIdentifier, method: String = "GET") {
    let body = Data("404 Not Found".utf8)
    send(status: "404 Not Found", body: body, contentType: "text/plain; charset=utf-8", on: connection, key: key, method: method)
  }

  private func send(
    status: String,
    body: Data,
    contentType: String,
    on connection: NWConnection,
    key: ObjectIdentifier,
    method: String
  ) {
    var header = ""
    let contentLength = method == "HEAD" ? 0 : body.count
    header += "HTTP/1.1 \(status)\r\n"
    header += "Content-Type: \(contentType)\r\n"
    header += "Content-Length: \(contentLength)\r\n"
    header += "Cache-Control: no-store\r\n"
    header += "Connection: close\r\n\r\n"

    let responseBody = method == "HEAD" ? Data() : body
    connection.send(content: Data(header.utf8) + responseBody, completion: .contentProcessed { _ in
      self.activeConnections[key] = nil
      connection.cancel()
    })
  }

  private func contentType(for pathExtension: String) -> String {
    switch pathExtension.lowercased() {
    case "html":
      return "text/html; charset=utf-8"
    case "json":
      return "application/json; charset=utf-8"
    case "js", "mjs":
      return "application/javascript; charset=utf-8"
    case "css":
      return "text/css; charset=utf-8"
    case "svg":
      return "image/svg+xml"
    case "png":
      return "image/png"
    case "jpg", "jpeg":
      return "image/jpeg"
    case "ico":
      return "image/x-icon"
    case "wasm":
      return "application/wasm"
    case "task":
      return "application/octet-stream"
    default:
      return "application/octet-stream"
    }
  }
}
