FROM mhart/alpine-node:7.0.0
MAINTAINER nukr <nukrs.w@gmail.com>

COPY package.json /tmp/package.json
RUN apk add --no-cache curl \
  && cd /tmp && npm install \
  && mkdir -p /opt/app \
  && cp -a /tmp/node_modules /opt/app/ \
  && apk del curl

WORKDIR /opt/app
COPY . /opt/app
EXPOSE 55555

# Run app
CMD ["node", "src/"]
