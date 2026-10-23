#!/bin/sh
set -eu

for variant in alpine-jdk21 debian-jdk21 latest; do
  (cd "$variant" && sh build.sh && sh push.sh)
done
