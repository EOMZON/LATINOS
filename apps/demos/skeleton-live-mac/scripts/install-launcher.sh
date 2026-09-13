#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="Skeleton Live"
APP_PATH="$ROOT/dist/$APP_NAME.app"
TARGET_DIR="${1:-$HOME/Desktop/CreationOS/mac}"
TARGET_PATH="$TARGET_DIR/$APP_NAME.app"

if [[ ! -d "$APP_PATH" ]]; then
  echo "error: build the app first: $APP_PATH not found" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
ln -sfn "$APP_PATH" "$TARGET_PATH"
echo "Launcher: $TARGET_PATH -> $APP_PATH"
