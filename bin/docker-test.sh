#!/bin/bash

set -uo pipefail

BALENA_IMG=balenalib/raspberrypi3-node:$(node --version | grep -o -e '[0-9][0-9].[0-9][0-9]')
YARN_CACHE_DIR=$(yarn cache dir)

export YARN_CACHE_DIR

echo "$BALENA_IMG $YARN_CACHE_DIR"
docker build -t vanbujm/raspi-led-build:latest --build-arg BALENA_IMG="$BALENA_IMG" .
