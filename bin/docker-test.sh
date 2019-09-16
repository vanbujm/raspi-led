#!/bin/bash

set -uo pipefail

regexp="^v([0-9]*\.[0-9]*)"
[[ $(node --version) =~ $regexp ]]

BALENA_IMG=balenalib/raspberrypi3-node:${BASH_REMATCH[1]}

YARN_CACHE_DIR=$(yarn cache dir)

docker build -t vanbujm/raspi-led-build:latest --build-arg BALENA_IMG="$BALENA_IMG" --build-arg YARN_CACHE_DIR="$YARN_CACHE_DIR" .
