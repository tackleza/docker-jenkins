#!/bin/sh
set -eu
docker pull jenkins/jenkins:alpine-jdk21
docker build -f Dockerfile --label "org.opencontainers.image.revision=$(git rev-parse HEAD)" -t tackleza/jenkins:alpine-jdk21 ..
