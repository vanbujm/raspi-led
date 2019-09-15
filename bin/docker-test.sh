#!/bin/bash

set -uo pipefail

node --version
node --version | grep -o -e '[0-9][0-9].[0-9][0-9]'

BALENA_IMG=balenalib/raspberrypi3-node:$(node --version | grep -o -e '[0-9][0-9].[0-9][0-9]')
echo "Pulling image: $BALENA_IMG"

docker pull "$BALENA_IMG"
docker run --rm --privileged -v "$(pwd)":/usr/app -w /usr/app "$BALENA_IMG" /bin/bash -c "yarn && yarn test:ci"
