FROM jenkins/jenkins:jdk21

USER root
RUN apt update
RUN apt upgrade -y
RUN apt install nodejs python3 maven -y
RUN bash -c "curl -L https://npmjs.org/install.sh | sh"
RUN npm install -g pnpm
USER jenkins
