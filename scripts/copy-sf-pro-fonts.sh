#!/usr/bin/env bash
# Copy SF Pro .otf files into app/fonts/sf-pro/ with names Next.js expects.
# Usage: ./scripts/copy-sf-pro-fonts.sh [/path/to/fonts]
# Default source: /Library/Fonts (after Apple's SF Pro installer)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/app/fonts/sf-pro"
SRC="${1:-/Library/Fonts}"

if [[ ! -d "$SRC" ]]; then
  echo "Usage: $0 [/path/to/folder/containing/SFPro*.otf]"
  exit 1
fi

mkdir -p "$DEST"

copy_if() {
  local from="$1"
  local to="$2"
  if [[ -f "$from" ]]; then
    cp -f "$from" "$DEST/$to"
    echo "  $to"
  fi
}

# Apple installer names (SF-Pro-Text-*.otf)
copy_if "$SRC/SF-Pro-Text-Regular.otf"   SFProText-Regular.otf
copy_if "$SRC/SF-Pro-Text-Medium.otf"    SFProText-Medium.otf
copy_if "$SRC/SF-Pro-Text-Semibold.otf"  SFProText-Semibold.otf
copy_if "$SRC/SF-Pro-Display-Regular.otf"   SFProDisplay-Regular.otf
copy_if "$SRC/SF-Pro-Display-Medium.otf"    SFProDisplay-Medium.otf
copy_if "$SRC/SF-Pro-Display-Semibold.otf"  SFProDisplay-Semibold.otf
copy_if "$SRC/SF-Mono-Regular.otf"       SFMono-Regular.otf

# Already-correct names from manual copy
find "$SRC" -maxdepth 5 \( \
  -iname 'SFProText-*.otf' -o \
  -iname 'SFProDisplay-*.otf' -o \
  -iname 'SFMono-*.otf' \
\) -exec cp -f {} "$DEST/" \; 2>/dev/null || true

echo "Fonts in $DEST:"
ls -la "$DEST"/*.otf 2>/dev/null || echo "(no .otf files — check path or README)"
