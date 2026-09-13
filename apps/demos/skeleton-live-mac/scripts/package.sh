#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONTENT_ROOT="${CONTENT_ROOT:-$(cd "$ROOT/../skeleton-live" && pwd)}"
APP_NAME="Skeleton Live"
BUNDLE_ID="local.skeletonlive.mac"
DISPLAY_NAME="Skeleton Live"
ICON_BASENAME="skeleton-live"

# Workbench is the default content kind. Packaging must prove that the wrapped
# web app passed the shared Zon shell gate; runtime/HTTP success alone is not UI compliance.
if [[ "0" == "1" ]]; then
  WORKBENCH_VERIFY_REL="scripts/verify-workbench-shell.sh"
  WORKBENCH_VERIFY="$CONTENT_ROOT/$WORKBENCH_VERIFY_REL"
  if [[ ! -x "$WORKBENCH_VERIFY" ]]; then
    echo "error: workbench shell verifier missing or not executable: $WORKBENCH_VERIFY" >&2
    echo "       implement the zon-workbench-shell-standard release gate in the source project" >&2
    echo "       or scaffold an actual non-workbench with --non-workbench" >&2
    exit 1
  fi
  echo "workbench shell preflight: $WORKBENCH_VERIFY"
  "$WORKBENCH_VERIFY"
fi

BUILD_DIR="${BUILD_DIR:-$ROOT/build}"
DIST_DIR="${DIST_DIR:-$ROOT/dist}"
APP_PATH="$DIST_DIR/$APP_NAME.app"
MACOS_DIR="$APP_PATH/Contents/MacOS"
RESOURCES_DIR="$APP_PATH/Contents/Resources"
PLIST_PATH="$APP_PATH/Contents/Info.plist"

mkdir -p "$BUILD_DIR" "$DIST_DIR"
rm -rf "$APP_PATH"
mkdir -p "$MACOS_DIR" "$RESOURCES_DIR"

# Bundle the static board content so the app is self-contained and does not
# need TCC permission to read the source tree on first launch.
cp -R "$CONTENT_ROOT/dist" "$RESOURCES_DIR/dist"

SWIFT_SOURCES=(
  "$ROOT/Sources/OpenLocalServiceApp.swift"
  "$ROOT/Sources/AppDelegate.swift"
  "$ROOT/Sources/ServerController.swift"
)
# StaticFileServer.swift only exists in static (non-launchd) mode.
if [[ "0" != "1" ]]; then
  SWIFT_SOURCES+=("$ROOT/Sources/StaticFileServer.swift")
fi

xcrun swiftc   -O   "${SWIFT_SOURCES[@]}"   -framework AppKit   -framework Network   -framework WebKit   -framework SwiftUI   -o "$MACOS_DIR/$APP_NAME"

cat >"$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>zh</string>
  <key>CFBundleDisplayName</key>
  <string>$DISPLAY_NAME</string>
  <key>CFBundleExecutable</key>
  <string>$APP_NAME</string>
  <key>CFBundleIconFile</key>
  <string>$ICON_BASENAME.icns</string>
  <key>CFBundleIdentifier</key>
  <string>$BUNDLE_ID</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>$APP_NAME</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>0.1</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSMinimumSystemVersion</key>
  <string>13.0</string>
  <key>LSUIElement</key>
  <false/>
  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsLocalNetworking</key>
    <true/>
  </dict>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>
EOF

if [[ -f "$ROOT/assets/icons/$ICON_BASENAME.icns" ]]; then
  cp "$ROOT/assets/icons/$ICON_BASENAME.icns" "$RESOURCES_DIR/$ICON_BASENAME.icns"
fi

# --- launchd user agent (macOS 26 safe external server) ---
# package.sh runs in bash (not the app), so launchctl load -w works here and
# persists across reboots. The app itself only connects to the running agent.
if [[ "0" == "1" ]]; then
  LAUNCH_AGENT_SRC="$ROOT/launch-agent/"local.skeleton-live.server".plist"
  LAUNCH_AGENT_DST="$HOME/Library/LaunchAgents/"local.skeleton-live.server".plist"
  if [[ -f "$LAUNCH_AGENT_SRC" ]]; then
    mkdir -p "$HOME/Library/LaunchAgents"
    cp "$LAUNCH_AGENT_SRC" "$LAUNCH_AGENT_DST"
    launchctl load -w "$LAUNCH_AGENT_DST" 2>&1 || true
    echo "launchd agent registered: $LAUNCH_AGENT_DST"
  else
    echo "warn: launch agent plist not found: $LAUNCH_AGENT_SRC" >&2
  fi
fi

SIGN_IDENTITY="${CODESIGN_IDENTITY:--}"
if [[ "$SIGN_IDENTITY" == "-" ]]; then
  echo "warn: using ad-hoc signing. Stable privacy grants across rebuilds need a stable Developer ID/Application certificate." >&2
  codesign --force --deep --sign - "$APP_PATH"
else
  codesign --force --deep --options runtime --timestamp --sign "$SIGN_IDENTITY" "$APP_PATH"
fi

codesign --verify --deep --strict --verbose=2 "$APP_PATH"
echo "App: $APP_PATH"
