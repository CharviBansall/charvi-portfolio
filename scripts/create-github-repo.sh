#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="charvi-portfolio"
GITHUB_USER="CharviBansall"
REMOTE="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
GH_BIN="${GH_BIN:-gh}"

cd "$(dirname "$0")/.."

if ! command -v "$GH_BIN" >/dev/null 2>&1; then
  echo "GitHub CLI (gh) not found. Install it or set GH_BIN to your gh path."
  exit 1
fi

if ! "$GH_BIN" auth status >/dev/null 2>&1; then
  echo "Sign in to GitHub first:"
  echo "  $GH_BIN auth login -h github.com -p https -w --skip-ssh-key"
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin already set: $(git remote get-url origin)"
else
  git remote add origin "$REMOTE"
fi

"$GH_BIN" repo create "$REPO_NAME" \
  --public \
  --source=. \
  --remote=origin \
  --description "Portfolio website for Charvi Bansal — charvibansal.com" \
  --push

echo "Done: https://github.com/${GITHUB_USER}/${REPO_NAME}"
