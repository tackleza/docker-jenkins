# Runtime-only emergency overlay: preserve exact Jenkins/JDK/application tools.
FROM node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS node_runtime
FROM tackleza/jenkins@sha256:0d967a9f0129e6674124dff38d8cfb00d7bbabcbaa3c466b06ed574427baac34
USER root
COPY --from=node_runtime /usr/local/bin/node /usr/bin/node
RUN node --version && npm --version && pnpm --version && java -version
USER jenkins
