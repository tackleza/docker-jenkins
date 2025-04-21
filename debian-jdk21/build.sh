#!/bin/bash
docker pull jenkins/jenkins:latest-jdk21
docker build -t tackleza/jenkins:debian-jdk21 .
