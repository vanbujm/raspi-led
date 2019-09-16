ARG BALENA_IMG=balenalib/raspberrypi3-debian-node
FROM $BALENA_IMG
RUN [ "cross-build-start" ]

WORKDIR /usr/app
# Copy package first because it will help with caching
COPY package.json ./package.json
RUN yarn

COPY . ./

RUN yarn test:ci

RUN [ "cross-build-end" ]
