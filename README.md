# server

In order to run the server part:
Into the server directory:
* `npm start`

The application can be used with two profiles, development and production. By default, is setted the development one.
You can run the application with a specific profile:
* `npm start env=development`
* `npm start env=production`

If you have a database connection (as described into the server/config/config.json):
* `npm start db=true`

By default, the db variable is setted to false.

The application responds to the HTTP GET request '/category'.
Query string params accepted:

* name (ex: Punk)
* id (ex: 1)
* level (ex: 2)
* l1 (ex: -1)
* l2 (ex: 3)
* operator (ex: AND)

Call examples:
* http://localhost:8081/category?name=Punk

It's also possible to execute more complete queries, by passing field operator and another accepter field

* http://localhost:8081/category?name=Punk&id=25&operator=AND

## test

In order to run the test part:
* `npm run test`

# frontend

In order to run the frontend part:
Into the frontend directory:
* `npm run serve`

# Common usage:

## Development:

* server: `npm start` -> localhost:8081/category || localhost:8081/category?name=Punk
* frontend: `npm run serve` -> localhost:8080

## Development with postgresql container running:

* server: `npm start db=true`
* frontend: `npm run serve`

# Docker

For each directory, was written a Dockerfile in order to build the image to use.
To control the entire environment, there is the docker-compose.yml file.

With the docker-compose.yml file, each container runs inside a custom envinronment. Each container uses a fixed custom ip.
The ip addresses:

* haproxy: 10.48.0.2
* postgres: 10.48.0.3
* server: 10.48.0.4
* frontend: 10.48.0.5

The server container is deployed using these arguments: env=production and db=true

So the server is connected by default to the db deployed into the postgres container

If you want to change the db connection, inside the docker-compose.yml file, server description, set, under environments, db=false

In order to run the Docker environment:

* `docker-compose up -d`

In this way, you can run the application on the url:
* http://localhost
