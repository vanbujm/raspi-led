ARG BALENA_IMG=balenalib/raspberrypi3-debian-node
ARG YARN_CACHE_DIR
FROM $BALENA_IMG
RUN [ "cross-build-start" ]

WORKDIR /usr/app
# Copy package first because it will help with caching
COPY package.json ./package.json
COPY .yarnrc ./.yarnrc
COPY yarn-cache ./yarn-cache
RUN yarn

COPY . ./

RUN yarn test:ci

RUN [ "cross-build-end" ]
