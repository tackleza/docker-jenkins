#!/bin/bash
docker pull jenkins/jenkins:jdk21
docker build -t tackleza/jenkins:debian-jdk21 .
