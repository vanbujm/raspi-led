#!/bin/bash

set -uo pipefail

node --version
regexp="^v([0-9]*\.[0-9]*)"
[[ $(node --version) =~ $regexp ]]
BALENA_IMG=balenalib/raspberrypi3-node:${BASH_REMATCH[1]}
YARN_CACHE_DIR=$(yarn cache dir)

export YARN_CACHE_DIR

echo "$BALENA_IMG $YARN_CACHE_DIR"
docker build -t vanbujm/raspi-led-build:latest --build-arg BALENA_IMG="$BALENA_IMG" .
