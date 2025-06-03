#!/bin/bash

bash -c "cd alpine-jdk21; sh build.sh; sh push.sh"
bash -c "cd debian-jdk21; sh build.sh; sh push.sh"
bash -c "cd latest; sh build.sh; sh push.sh"
