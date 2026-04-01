# Jenkins Docker Image

Enhanced Jenkins image with essential development tools pre-installed.

**Docker Hub:** https://hub.docker.com/r/tackleza/jenkins

Based on the official [`jenkins/jenkins`](https://hub.docker.com) image. Everything from the official image is included, with additional tools added for common development workflows.

## Available Tags

| Tag | Description |
|-----|-------------|
| `latest` | Jenkins on Debian with JDK 21 |
| `debian-jdk21` | Jenkins on Debian with JDK 21 |
| `alpine-jdk21` | Jenkins on Alpine with JDK 21 |

## Included Tools

In addition to the official Jenkins image:

- **JDK** — Java Development Kit (version matches tag)
- **Maven (`mvn`)** — Build automation tool
- **Python 3** — Programming language
- **Node.js, npm, pnpm** — JavaScript runtime and package managers
- **ping** — Basic networking utility

These tools are available immediately in Jenkins pipelines and container shells — no additional setup required.

## Quick Start

```bash
# Pull the latest image
docker pull tackleza/jenkins:latest

# Run the container
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  tackleza/jenkins:latest
```

## Base Image

This image extends the official [`jenkins/jenkins`](https://hub.docker.com/r/jenkins/jenkins) image. For core Jenkins documentation, visit the official image page.
