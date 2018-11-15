# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:latest

RUN mkdir -p /tmp/app
ADD . /tmp/app/
RUN cd /tmp/app/ && npm install
RUN mkdir -p /usr/src/app && cp -r /tmp/app/* /usr/src/app

WORKDIR /usr/src/app

ENV PORT=8081
ENV ENV "env=production"

CMD node bin/www $ENV