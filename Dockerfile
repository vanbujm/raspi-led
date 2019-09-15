FROM balenalib/raspberrypi3-debian-node

WORKDIR /usr/app
# Copy package first because it will help with caching
COPY package.json ./package.json
RUN yarn

COPY . ./
