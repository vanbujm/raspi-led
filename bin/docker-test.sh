#!/bin/bash

set -uo pipefail

BALENA_IMG=balenalib/raspberrypi3-node:$(node --version | grep -o -e '[0-9][0-9].[0-9][0-9]')
echo "Pulling image: $BALENA_IMG"

docker pull "$BALENA_IMG"
docker run -v "$(pwd)":/usr/app -w /usr/app -v "$(yarn cache dir)":/yarn-cache "$BALENA_IMG" bash -c "yarn --cache-folder /yarn-cache && yarn test:ci"
