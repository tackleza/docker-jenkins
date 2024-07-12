#!/bin/bash
docker pull jenkins/jenkins:alpine-jdk21
docker build -t tackleza/jenkins:alpine-jdk21 .
