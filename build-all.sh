#!/bin/sh
set -eu

for variant in alpine-jdk21 debian-jdk21 alpine-jdk25 debian-jdk25 latest; do
  (cd "$variant" && sh build.sh && sh push.sh)
done
