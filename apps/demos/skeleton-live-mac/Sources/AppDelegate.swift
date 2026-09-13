import AppKit
import Foundation
import WebKit

@MainActor
final class AppDelegate: NSObject, NSApplicationDelegate, NSWindowDelegate {
  private static let boardRelativeDirectory = "dist"
  private static let refreshScriptRelativePath: String? = nil
  private static let preferredPort = 8917

  private let rootURL = Bundle.main.resourceURL!

  private lazy var runtime = ServerController(rootURL: rootURL, boardRelativeDirectory: "dist", refreshScriptRelativePath: nil, preferredPort: 8917)

  private var window: NSWindow?
  private var webView: WKWebView?
  private var statusLabel: NSTextField?
  private var loadingSpinner: NSProgressIndicator?
  private var refreshButton: NSButton?
  private var openButton: NSButton?
  private var quitButton: NSButton?
  private var loadTask: Task<Void, Never>?
  private var isLoading = false

  func applicationDidFinishLaunching(_ notification: Notification) {
    NSApp.setActivationPolicy(.regular)
    buildWindow()
    window?.makeKeyAndOrderFront(nil)
    NSApp.activate(ignoringOtherApps: true)
    startLoad(message: "正在打开本地内容…", refreshAfterLoad: false)
  }

  func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }

  func applicationWillTerminate(_ notification: Notification) {
    loadTask?.cancel()
    runtime.stop()
  }

  func windowWillClose(_ notification: Notification) {
    NSApp.terminate(nil)
  }

  @objc private func refreshBoard() {
    guard runtime.canRefresh else { return }
    startRefresh(message: "正在更新最新快照…")
  }

  @objc private func openInBrowser() {
    guard let url = runtime.boardURL else { return }
    NSWorkspace.shared.open(url)
  }

  @objc private func quitApp() {
    NSApp.terminate(nil)
  }

  private func buildWindow() {
    let frame = NSRect(x: 0, y: 0, width: 1360, height: 860)
    let window = NSWindow(
      contentRect: frame,
      styleMask: [.titled, .closable, .miniaturizable, .resizable],
      backing: .buffered,
      defer: false
    )
    window.title = "Skeleton Live"
    window.minSize = NSSize(width: 920, height: 620)
    window.center()
    window.isReleasedWhenClosed = false
    window.delegate = self

    let container = NSView(frame: frame)
    container.translatesAutoresizingMaskIntoConstraints = false

    let titleLabel = NSTextField(labelWithString: "Skeleton Live")
    titleLabel.font = .systemFont(ofSize: 20, weight: .semibold)
    titleLabel.translatesAutoresizingMaskIntoConstraints = false

    let captionLabel = NSTextField(labelWithString: "Local only · opens to start the service · quits to stop it")
    captionLabel.font = .systemFont(ofSize: 11, weight: .regular)
    captionLabel.textColor = .secondaryLabelColor
    captionLabel.translatesAutoresizingMaskIntoConstraints = false

    let titleStack = NSStackView(views: [titleLabel, captionLabel])
    titleStack.orientation = .vertical
    titleStack.alignment = .leading
    titleStack.spacing = 3
    titleStack.translatesAutoresizingMaskIntoConstraints = false

    let spinner = NSProgressIndicator()
    spinner.style = .spinning
    spinner.controlSize = .small
    spinner.isDisplayedWhenStopped = false
    spinner.translatesAutoresizingMaskIntoConstraints = false

    let statusLabel = NSTextField(labelWithString: "准备启动本地内容…")
    statusLabel.font = .systemFont(ofSize: 11, weight: .medium)
    statusLabel.textColor = .secondaryLabelColor
    statusLabel.lineBreakMode = .byTruncatingTail
    statusLabel.translatesAutoresizingMaskIntoConstraints = false
    statusLabel.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)

    let refreshButton = makeButton(title: "刷新", action: #selector(refreshBoard))
    refreshButton.isEnabled = runtime.canRefresh
    let openButton = makeButton(title: "浏览器", action: #selector(openInBrowser))
    let quitButton = makeButton(title: "退出", action: #selector(quitApp))

    let statusStack = NSStackView(views: [spinner, statusLabel])
    statusStack.orientation = .horizontal
    statusStack.alignment = .centerY
    statusStack.spacing = 8
    statusStack.translatesAutoresizingMaskIntoConstraints = false

    let spacer = NSView()
    spacer.translatesAutoresizingMaskIntoConstraints = false
    spacer.setContentHuggingPriority(.defaultLow, for: .horizontal)
    spacer.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)

    let buttonStack = NSStackView(views: [refreshButton, openButton, quitButton])
    buttonStack.orientation = .horizontal
    buttonStack.alignment = .centerY
    buttonStack.spacing = 8
    buttonStack.translatesAutoresizingMaskIntoConstraints = false

    let header = NSStackView(views: [titleStack, spacer, statusStack, buttonStack])
    header.orientation = .horizontal
    header.alignment = .centerY
    header.spacing = 14
    header.edgeInsets = NSEdgeInsets(top: 12, left: 18, bottom: 12, right: 18)
    header.translatesAutoresizingMaskIntoConstraints = false

    let separator = NSBox()
    separator.boxType = .separator
    separator.translatesAutoresizingMaskIntoConstraints = false

    let configuration = WKWebViewConfiguration()
    configuration.websiteDataStore = .nonPersistent()
    configuration.preferences.javaScriptCanOpenWindowsAutomatically = true

    let webView = WKWebView(frame: .zero, configuration: configuration)
    webView.translatesAutoresizingMaskIntoConstraints = false
    webView.setValue(false, forKey: "drawsBackground")

    container.addSubview(header)
    container.addSubview(separator)
    container.addSubview(webView)

    NSLayoutConstraint.activate([
      header.leadingAnchor.constraint(equalTo: container.leadingAnchor),
      header.trailingAnchor.constraint(equalTo: container.trailingAnchor),
      header.topAnchor.constraint(equalTo: container.topAnchor),

      separator.leadingAnchor.constraint(equalTo: container.leadingAnchor),
      separator.trailingAnchor.constraint(equalTo: container.trailingAnchor),
      separator.topAnchor.constraint(equalTo: header.bottomAnchor),

      webView.leadingAnchor.constraint(equalTo: container.leadingAnchor),
      webView.trailingAnchor.constraint(equalTo: container.trailingAnchor),
      webView.topAnchor.constraint(equalTo: separator.bottomAnchor),
      webView.bottomAnchor.constraint(equalTo: container.bottomAnchor),
    ])

    window.contentView = container

    self.window = window
    self.webView = webView
    self.statusLabel = statusLabel
    self.loadingSpinner = spinner
    self.refreshButton = refreshButton
    self.openButton = openButton
    self.quitButton = quitButton

    setLoadingState(isLoading: false, message: "准备启动本地内容…")
  }

  private func makeButton(title: String, action: Selector) -> NSButton {
    let button = NSButton(title: title, target: self, action: action)
    button.bezelStyle = .rounded
    button.controlSize = .small
    button.translatesAutoresizingMaskIntoConstraints = false
    return button
  }

  private func startLoad(message: String, refreshAfterLoad: Bool) {
    guard !isLoading else { return }
    setLoadingState(isLoading: true, message: message)
    loadTask?.cancel()
    loadTask = Task { [weak self] in
      await self?.loadBoard(refreshAfterLoad: refreshAfterLoad)
    }
  }

  private func startRefresh(message: String) {
    guard !isLoading else { return }
    setLoadingState(isLoading: true, message: message)
    loadTask?.cancel()
    loadTask = Task { [weak self] in
      await self?.refreshBoardData()
    }
  }

  private func loadBoard(refreshAfterLoad: Bool) async {
    do {
      try runtime.validateConfiguration()
      let url = try await runtime.startIfNeeded()
      await MainActor.run { [weak self] in
        self?.showBoard(at: url, message: "本地内容已打开")
      }
      guard refreshAfterLoad else { return }
      await refreshBoardData()
    } catch {
      await MainActor.run { [weak self] in
        self?.presentRuntimeError(error)
      }
    }
  }

  private func refreshBoardData() async {
    guard runtime.canRefresh else { return }
    await MainActor.run { [weak self] in
      self?.setLoadingState(isLoading: true, message: "正在更新最新快照…")
    }

    do {
      try runtime.refreshBoard(timeoutSeconds: 600)
      let url = try await runtime.startIfNeeded()
      await MainActor.run { [weak self] in
        self?.showBoard(at: url, message: "最新快照已载入")
      }
    } catch {
      await MainActor.run { [weak self] in
        self?.presentRefreshFailure(error)
      }
    }
  }

  @MainActor
  private func showBoard(at url: URL, message: String) {
    let request = URLRequest(
      url: url,
      cachePolicy: .reloadIgnoringLocalAndRemoteCacheData,
      timeoutInterval: 30
    )
    webView?.load(request)
    setLoadingState(isLoading: false, message: message)
  }

  @MainActor
  private func setLoadingState(isLoading: Bool, message: String) {
    self.isLoading = isLoading
    statusLabel?.stringValue = message
    if isLoading {
      loadingSpinner?.startAnimation(nil)
    } else {
      loadingSpinner?.stopAnimation(nil)
    }
    refreshButton?.isEnabled = !isLoading && runtime.canRefresh
    openButton?.isEnabled = !isLoading && runtime.boardURL != nil
    quitButton?.isEnabled = true
  }

  @MainActor
  private func presentRefreshFailure(_ error: Error) {
    setLoadingState(isLoading: false, message: "刷新失败，当前保留上次快照")
    let alert = NSAlert()
    alert.messageText = "Skeleton Live" + " 刷新失败"
    alert.informativeText = error.localizedDescription
    alert.alertStyle = .warning
    alert.runModal()
  }

  @MainActor
  private func presentRuntimeError(_ error: Error) {
    setLoadingState(isLoading: false, message: "本地内容启动失败")
    let alert = NSAlert()
    alert.messageText = "Skeleton Live" + " 启动失败"
    alert.informativeText = error.localizedDescription
    alert.alertStyle = .critical
    alert.runModal()
  }
}
