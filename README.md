# Jenkins Docker Image

| Repository | Link |
|-------------|------|
| GitHub | https://github.com/tackleza/docker-jenkins |
| Docker Hub | https://hub.docker.com/r/tackleza/jenkins |

Enhanced Jenkins image with essential development tools pre-installed.

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

## Node.js security baseline (2026-10-23)

All source variants now pin official Node **24.22.1 LTS** by digest instead of
installing the distribution's `nodejs` package. The Node project's October 21
security release fixes high-severity Brotli, DNS and TLS vulnerabilities. Node
20 and older, and odd releases 21/23/25, are end of life and receive no further
upstream patches. npm is pinned to11.21.1 and pnpm to10.34.7 after auditing the installed
package-manager dependency trees. Rebuilding/publishing and recreating dependent
controllers is required; changing these Dockerfiles alone does not update
existing images or running controllers.

For the existing SVD01 controllers, [security-node24](security-node24/README.md)
provides a separate immutable-base emergency overlay which preserves the
installed Jenkins/JDK while replacing EOL Node20 with patched Node24
and patching npm11/pnpm10 within their current majors. Check dependent jobs, queues and executors before sequential
controller maintenance; preserve home volumes and private configuration and
retain the previous image/container for rollback. Shared `latest` tags are not
republished by that maintenance workflow.

Sources: [official security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases),
[upstream support status](https://nodejs.org/en/about/previous-releases).

## Bundled package-manager security patch

The images retain npm11.21.1 and pnpm10.34.7. Their bundled `ip-address` copies are replaced with the exact upstream10.7.4 package to fix [GHSA-rxp7-6hxx-x8q5](https://github.com/advisories/GHSA-rxp7-6hxx-x8q5). The Dockerfiles verify the archive SHA256, require both expected package locations and preserve root ownership. The pnpm executable also embeds its own copy: a checksum-guarded backport applies the exact upstream zone-parser fix there, and tests exercise the embedded module independently. This is a reviewed downstream dependency patch; reinstalling either package manager can restore the vulnerable dependency until upstream includes the fix.

Run `node tests/ip-address.cjs` inside either built image (the script can be supplied on stdin). Validation covers address parsing, IPv6 zone behavior and bounded rejection of the advisory input. Check the actual installed package trees when auditing bundled tooling.

Pushes and manual GitHub Actions runs always build security source changes. Scheduled runs retain the Jenkins-base digest check. Build scripts stop at the first failed build or push.

The published images record the source revision in `org.opencontainers.image.revision`. Future npm/pnpm version changes must reassess/remove the downstream patch; its checksum/version guards intentionally fail if the expected bundle changes. Build a variant from the repository root with `docker build -f latest/Dockerfile .`, or run its existing `build.sh` from the variant directory.
