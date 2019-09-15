#!/bin/bash

set -uo pipefail

export BALENA_IMG=balenalib/raspberrypi3-node:$(node --version | grep -o -e '[0-9][0-9].[0-9][0-9]')
export YARN_CACHE_DIR=$(yarn cache dir)
docker build -t vanbujm/raspi-led-build:latest --build-arg BALENA_IMG="$BALENA_IMG" .
