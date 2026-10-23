#!/bin/sh
set -eu
docker pull jenkins/jenkins:latest-jdk21
docker build -f Dockerfile --label "org.opencontainers.image.revision=$(git rev-parse HEAD)" -t tackleza/jenkins:latest ..
