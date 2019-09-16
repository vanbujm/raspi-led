ARG BALENA_IMG=balenalib/raspberrypi3-debian-node
ARG YARN_CACHE_DIR
FROM $BALENA_IMG
RUN [ "cross-build-start" ]

WORKDIR /usr/app
# Copy package first because it will help with caching
COPY package.json ./package.json

ENV YARN_CACHE_DIR $YARN_CACHE_DIR

COPY $YARN_CACHE_DIR /yarn-cache
RUN yarn --cache-folder /yarn-cache

COPY . ./

RUN yarn test:ci

RUN [ "cross-build-end" ]
