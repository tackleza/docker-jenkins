FROM node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS node_runtime
FROM jenkins/jenkins:latest-jdk21

USER root
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends python3 maven iputils-ping ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY --from=node_runtime /usr/local/bin/node /usr/local/bin/node
COPY --from=node_runtime /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
COPY security/patch-pnpm-bundle.cjs /tmp/patch-pnpm-bundle.cjs
RUN ln -sf ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -sf ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \
    && npm install -g npm@11.21.1 pnpm@10.34.7 \
    && npm pack --ignore-scripts --pack-destination /tmp ip-address@10.7.4 \
    && echo 'f9e1d0dd369c002f43770c6ee35942c8078e76d080a1e18e89113eef865f26ff  /tmp/ip-address-10.7.4.tgz' | sha256sum -c - \
    && for target in /usr/local/lib/node_modules/npm/node_modules/ip-address /usr/local/lib/node_modules/pnpm/dist/node_modules/ip-address; do \
         test -f "$target/package.json" || exit 1; \
         rm -rf "$target" && mkdir -p "$target" && tar -xzf /tmp/ip-address-10.7.4.tgz -C "$target" --strip-components=1 && chown -R root:root "$target" || exit 1; \
       done \
    && node /tmp/patch-pnpm-bundle.cjs \
    && rm /tmp/patch-pnpm-bundle.cjs /tmp/ip-address-10.7.4.tgz \
    && node --version && npm --version && pnpm --version
USER jenkins
LABEL org.apidech.security.ip-address="10.7.4" org.apidech.security.pnpm-bundle="GHSA-rxp7-6hxx-x8q5"
LABEL org.apidech.security.uuid-bounds="GHSA-w5hq-g745-h8pq"
