# Enhanced Jenkins Docker Image

Docker Hub: https://hub.docker.com/r/tackleza/jenkins

This image is based on the official [`jenkins/jenkins`](https://hub.docker.com/r/jenkins/jenkins) image, with additional essential development tools included out-of-the-box.

Everything remains the same as the official Jenkins image, but with helpful software added so you can use common commands directly without additional setup.

## Tags Available

* `alpine-jdk21`
* `debian-jdk21`

## Included Software

This image includes the following additional tools:

* `jdk` – Java Development Kit (version matches tag)
* `maven (mvn)` – Build automation tool
* `python3` – Popular programming language
* `node`, `npm`, `pnpm` – JavaScript runtime and package managers
* `ping` – Basic networking utility

These tools are pre-installed, so you can use them immediately within your Jenkins pipelines or custom scripts.

---

📌 For core Jenkins documentation, visit the official image page: [https://hub.docker.com/r/jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins)
