# Emergency Node LTS runtime overlay

The 2026-10-23 SVD01 snapshot/release controller image bundled EOL Node 20.19.2.
This recipe replaces only the Node executable with official patched Node
24.22.1 LTS, preserving the exact existing Jenkins 2.565/JDK21 image, npm
11.15.0, pnpm10.33.4 and other tools. It is a uniquely tagged maintenance image;
it does not republish or move the shared `latest` tag.

Before using a shared runtime, inspect every controller job and queued/running
build. The audit found no direct Node/npm/pnpm/yarn commands; the two snapshot
shell-script jobs were inspected: audio bootstrap uses Maven/Git, while
AverstResourceUI selects its own Node24.22.1 tool directory before package work.
Keep that per-job pin intact.

Build on SVD01 from this Dockerfile, verify Node/npm/pnpm and the existing
Jenkins/Java versions, quiet one idle controller, record its exact prior image
and container settings, then recreate only that controller preserving the home
volume, network aliases, ports, restart policy and private environment. Keep
the prior container stopped under a rollback name until HTTP/controller and
queue/node checks pass. Repeat separately for the other controller. Never
interrupt an active build or change both controllers at once.

The ordinary Dockerfiles now also pin official patched Node24.22.1,
replacing the distribution `nodejs` package and mutable npm install script. This emergency overlay fixes existing controllers without
introducing a Jenkins/JDK upgrade; follow-up image-base modernization remains
separate from this security release.

Advisory: https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
Support: https://nodejs.org/en/about/previous-releases
