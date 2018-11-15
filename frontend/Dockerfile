# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:latest

RUN mkdir -p /tmp/app/app
ADD vue.config.js /tmp/app/app/vue.config.js
ADD src /tmp/app/src
ADD server.js /tmp/app/server.js
ADD public /tmp/app/public
ADD package.json /tmp/app/package.json
ADD config /tmp/app/config
ADD babel.config.js /tmp/app/babel.config.js
RUN npm install -g @vue/cli
RUN cd /tmp/app/ && npm install && npm run build
RUN mkdir -p /usr/src/app && cp -r /tmp/app/dist /usr/src/app/ && cp -r /tmp/app/node_modules /usr/src/app/ && cp -r /tmp/app/server.js /usr/src/app/
RUN rm -rf /tmp/app

WORKDIR /usr/src/app

ENV PORT=8080

CMD node server.js