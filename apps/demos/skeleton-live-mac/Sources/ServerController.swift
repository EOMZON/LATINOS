import Foundation

final class ServerController {
  enum RuntimeError: LocalizedError {
    case missingRoot(String)
    case missingBoard(String)
    case missingRefreshScript(String)
    case refreshTimedOut(TimeInterval)
    case refreshFailed(String)
    case serverUnavailable([Int])

    var errorDescription: String? {
      switch self {
      case .missingRoot(let path):
        return "找不到本地根目录：\(path)"
      case .missingBoard(let path):
        return "找不到本地页面：\(path)"
      case .missingRefreshScript(let path):
        return "找不到 refresh 脚本：\(path)"
      case .refreshTimedOut(let seconds):
        return "refresh 超时（\(Int(seconds)) 秒），当前保留上次快照"
      case .refreshFailed(let output):
        return output.isEmpty ? "refresh 脚本执行失败" : output
      case .serverUnavailable(let ports):
        guard let first = ports.first, let last = ports.last else {
          return "本地静态服务启动失败"
        }
        return "本地静态服务启动失败，已尝试端口 \(first)-\(last)"
      }
    }
  }

  private struct ExecutableLaunch {
    let executableURL: URL
    let argumentsPrefix: [String]
  }

  private let rootURL: URL
  private let boardRelativeDirectory: String
  private let refreshScriptRelativePath: String?
  private let preferredPort: Int

  private(set) var port: Int?
  private var refreshProcess: Process?
  private var server: StaticFileServer?

  var canRefresh: Bool { refreshScriptRelativePath != nil }

  var boardURL: URL? {
    guard let port else { return nil }
    return URL(string: "http://127.0.0.1:\(port)/\(boardRelativeDirectory)/")
  }

  init(rootURL: URL, boardRelativeDirectory: String, refreshScriptRelativePath: String?, preferredPort: Int) {
    self.rootURL = rootURL
    self.boardRelativeDirectory = boardRelativeDirectory
    self.refreshScriptRelativePath = refreshScriptRelativePath
    self.preferredPort = preferredPort
  }

  func validateConfiguration() throws {
    let fm = FileManager.default
    if !fm.fileExists(atPath: rootURL.path) {
      throw RuntimeError.missingRoot(rootURL.path)
    }
    if !fm.fileExists(atPath: boardIndexURL().path) {
      throw RuntimeError.missingBoard(boardIndexURL().path)
    }
    if let refreshScriptRelativePath, !fm.fileExists(atPath: refreshScriptURL(for: refreshScriptRelativePath).path) {
      throw RuntimeError.missingRefreshScript(refreshScriptURL(for: refreshScriptRelativePath).path)
    }
  }

  func refreshBoard(timeoutSeconds: TimeInterval = 600) throws {
    try validateConfiguration()
    guard let refreshScriptRelativePath else { return }

    let node = findNodeExecutable()
    let process = Process()
    let stdoutURL = temporaryFileURL(prefix: "board-refresh-stdout")
    let stderrURL = temporaryFileURL(prefix: "board-refresh-stderr")
    FileManager.default.createFile(atPath: stdoutURL.path, contents: Data())
    FileManager.default.createFile(atPath: stderrURL.path, contents: Data())
    let stdout = try FileHandle(forWritingTo: stdoutURL)
    let stderr = try FileHandle(forWritingTo: stderrURL)

    process.executableURL = node.executableURL
    process.arguments = node.argumentsPrefix + [refreshScriptURL(for: refreshScriptRelativePath).path]
    process.currentDirectoryURL = rootURL
    process.standardOutput = stdout
    process.standardError = stderr

    refreshProcess = process
    defer {
      refreshProcess = nil
      try? stdout.close()
      try? stderr.close()
      try? FileManager.default.removeItem(at: stdoutURL)
      try? FileManager.default.removeItem(at: stderrURL)
    }

    try process.run()
    let deadline = Date().addingTimeInterval(timeoutSeconds)
    while process.isRunning && Date() < deadline {
      Thread.sleep(forTimeInterval: 0.2)
    }

    if process.isRunning {
      process.terminate()
      process.waitUntilExit()
      throw RuntimeError.refreshTimedOut(timeoutSeconds)
    }

    let combinedOutput = [
      readAll(from: stdoutURL),
      readAll(from: stderrURL),
    ]
    .filter { !$0.isEmpty }
    .joined(separator: "\n")
    .trimmingCharacters(in: .whitespacesAndNewlines)

    guard process.terminationStatus == 0 else {
      throw RuntimeError.refreshFailed(combinedOutput)
    }
  }

  func startIfNeeded() async throws -> URL {
    if let url = boardURL, await Self.canFetch(url: url, timeoutSeconds: 0.8) {
      return url
    }
    return try await startServer()
  }

  func stop() {
    terminate(&refreshProcess)
    server?.stop()
    server = nil
    port = nil
  }

  private func startServer() async throws -> URL {
    let first = max(1024, preferredPort)
    let ports = [first] + Array((first + 1)...(first + 12))

    for candidate in ports {
      server?.stop()
      server = nil
      do {
        let server = StaticFileServer(rootURL: rootURL)
        try await server.start(port: candidate)
        self.server = server
        let url = URL(string: "http://127.0.0.1:\(candidate)/\(boardRelativeDirectory)/")!
        let ready = try await waitUntilReady(url: url, timeoutSeconds: 8)
        if ready {
          port = candidate
          return url
        }
      } catch {
        server?.stop()
        server = nil
      }
    }

    throw RuntimeError.serverUnavailable(ports)
  }

  private func waitUntilReady(url: URL, timeoutSeconds: TimeInterval) async throws -> Bool {
    let startedAt = Date()
    while Date().timeIntervalSince(startedAt) < timeoutSeconds {
      if server == nil { return false }
      if await Self.canFetch(url: url, timeoutSeconds: 0.6) {
        return true
      }
      try await Task.sleep(nanoseconds: 200_000_000)
    }
    return false
  }

  private func terminate(_ processRef: inout Process?) {
    guard let process = processRef else { return }
    if process.isRunning {
      process.terminate()
      process.waitUntilExit()
    }
    processRef = nil
  }

  private func boardIndexURL() -> URL {
    rootURL
      .appendingPathComponent(boardRelativeDirectory, isDirectory: true)
      .appendingPathComponent("index.html", isDirectory: false)
  }

  private func refreshScriptURL(for relativePath: String) -> URL {
    rootURL.appendingPathComponent(relativePath, isDirectory: false)
  }

  private func temporaryFileURL(prefix: String) -> URL {
    FileManager.default.temporaryDirectory
      .appendingPathComponent("\(prefix)-\(UUID().uuidString).log", isDirectory: false)
  }

  private func readAll(from url: URL) -> String {
    (try? String(contentsOf: url, encoding: .utf8)) ?? ""
  }

  private static func canFetch(url: URL, timeoutSeconds: TimeInterval) async -> Bool {
    guard let host = url.host, let port = url.port else { return false }
    return await tcpReady(host: host, port: port, timeoutSeconds: timeoutSeconds)
  }

  /// TCP-level readiness probe. A plain BSD-socket connect is used instead of
  /// an HTTP fetch so detection does not depend on App Transport Security
  /// (which would otherwise block `http://127.0.0.1` from within the app). The
  /// blocking socket work runs on a background queue and the continuation is
  /// resumed exactly once.
  private static func tcpReady(host: String, port: Int, timeoutSeconds: TimeInterval) async -> Bool {
    await withCheckedContinuation { continuation in
      DispatchQueue.global(qos: .userInitiated).async {
        continuation.resume(returning: Self.tcpConnectReady(host: host, port: port, timeoutSeconds: timeoutSeconds))
      }
    }
  }

  private static func tcpConnectReady(host: String, port: Int, timeoutSeconds: TimeInterval) -> Bool {
    var hints = addrinfo(
      ai_flags: AI_NUMERICSERV,
      ai_family: AF_UNSPEC,
      ai_socktype: SOCK_STREAM,
      ai_protocol: 0,
      ai_addrlen: 0,
      ai_canonname: nil,
      ai_addr: nil,
      ai_next: nil
    )
    let service = "\(port)"
    var result: UnsafeMutablePointer<addrinfo>?
    guard getaddrinfo(host, service, &hints, &result) == 0, let head = result else {
      return false
    }
    defer { freeaddrinfo(result) }

    var addrPtr: UnsafeMutablePointer<addrinfo>? = head
    while let ai = addrPtr {
      let p = ai
      let fd = socket(p.pointee.ai_family, p.pointee.ai_socktype, p.pointee.ai_protocol)
      if fd >= 0 {
        defer { close(fd) }
        let flags = fcntl(fd, F_GETFL, 0)
        _ = fcntl(fd, F_SETFL, flags | O_NONBLOCK)
        let r = connect(fd, p.pointee.ai_addr, p.pointee.ai_addrlen)
        if r == 0 {
          return true
        }
        if errno == EINPROGRESS {
          var pfd = pollfd(fd: Int32(fd), events: Int16(POLLOUT), revents: 0)
          let ms = Int32(timeoutSeconds * 1000)
          let pr = poll(&pfd, 1, ms)
          if pr > 0, (pfd.revents & Int16(POLLOUT)) != 0 {
            var err = 0
            var len = socklen_t(MemoryLayout<Int32>.size)
            if getsockopt(fd, SOL_SOCKET, SO_ERROR, &err, &len) == 0, err == 0 {
              return true
            }
          }
        }
      }
      addrPtr = p.pointee.ai_next
    }
    return false
  }

  private func findNodeExecutable() -> ExecutableLaunch {
    let candidates = [
      "/opt/homebrew/bin/node",
      "/usr/local/bin/node",
      "/usr/bin/node",
    ]

    for path in candidates where FileManager.default.isExecutableFile(atPath: path) {
      return ExecutableLaunch(executableURL: URL(fileURLWithPath: path), argumentsPrefix: [])
    }

    return ExecutableLaunch(executableURL: URL(fileURLWithPath: "/usr/bin/env"), argumentsPrefix: ["node"])
  }
}
