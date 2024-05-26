FROM jenkins/jenkins:alpine-jdk21

USER root
RUN apk add maven python3 nodejs npm
RUN npm install -g pnpm
USER jenkins
