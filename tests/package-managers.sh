#!/bin/sh
set -eu
test "$(node --version)" = v24.22.1
test "$(npm --version)" = 11.21.1
test "$(pnpm --version)" = 10.34.7
test "$(stat -c %u /usr/local/lib/node_modules/npm/node_modules/ip-address/package.json)" = 0
test "$(stat -c %u /usr/local/lib/node_modules/pnpm/dist/node_modules/ip-address/package.json)" = 0
test "$(stat -c %u /usr/local/lib/node_modules/pnpm/dist/pnpm.cjs)" = 0
fixture=$(mktemp -d)
trap 'rm -rf "$fixture"' EXIT
cd "$fixture"
printf '%s\n' '{"name":"security-toolchain-smoke","version":"1.0.0","private":true,"dependencies":{"is-number":"7.0.0"}}' > package.json
npm install --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci --ignore-scripts --no-audit --no-fund
node -e 'require("node:assert/strict")(require("is-number")("42"))'
rm -rf node_modules
pnpm install --lockfile-only --ignore-scripts
pnpm install --frozen-lockfile --ignore-scripts
node -e 'require("node:assert/strict")(require("is-number")("42"))'
echo 'npm ci, pnpm frozen-lockfile installs, runtime and ownership checks passed'
