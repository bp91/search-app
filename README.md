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

The application responds to the following HTTP GET requests:
* `/categories`, Query string params accepted:
    * name (ex: Punk)
    * id (ex: 1)
    * level (ex: 2)
    * l1 (ex: -1)
    * l2 (ex: 3)
    * l3 (ex: -3)
    * l4 (ex: -2)
    * pic (ex: /assets/img/categories/category_343.jpg)
    * type (ex: audience)
* `/psychographics`, Query string params accepted:
    * label (ex: Advertising)
    * id (ex: Adv Strategy)
    * pic (ex: /assets/img/psychographics/ico/psy_6.jpg)
    * value (ex: Ads EmergingMediaVehicles)
    * description(ex: This group responds...)
    * ico (ex: abc)
    * addonId (ex: cy)
* `/fixedCategories`, In order to search in a certain level. Query string params accepted:
    * fixedLevel (ex: 2) MANDATORY
    * name (ex: Punk)
    * id (ex: 1)
    * level (ex: 2)
    * l1 (ex: -1)
    * l2 (ex: 3)
    * l3 (ex: -3)
    * l4 (ex: -2)
    * pic (ex: /assets/img/categories/category_343.jpg)
    * type (ex: audience)
* `/fixedPsychographics`, In order to search in a certain level. Query string params accepted:
    * fixedLevel (ex: 2) MANDATORY
    * label (ex: Advertising)
    * id (ex: Adv Strategy)
    * pic (ex: /assets/img/psychographics/ico/psy_6.jpg)
    * value (ex: Ads EmergingMediaVehicles)
    * description(ex: This group responds...)
    * ico (ex: abc)
    * addonId (ex: cy)

Call examples:
* `http://localhost:8081/categories?name=Punk`
* `http://localhost:8081/psychographics?label=Advertising`
* `http://localhost:8081/fixedCategories?name=Punk&fixedLevel=2`
* `http://localhost:8081/fixedPsychographics?label=Advertising&fixedLevel=3`

It's also possible to execute more complete queries, by passing field operator (MANDATORY field) and another accepted field

* `http://localhost:8081/categories?name=Punk&id=25&operator=and`
* `http://localhost:8081/psychographics?label=Advertising&id=Adv+Strategy&operator=and`
* `http://localhost:8081/fixedCategories?name=Punk&id=25&operator=and&fixedLevel=2`
* `http://localhost:8081/fixedPsychographics?label=Advertising&id=Adv+Strategy&fixedLevel=3&operator=and`

## test

In order to run the test part:
* `npm run test`

# frontend

In order to run the frontend part:
Into the frontend directory:
* `npm run serve`

# Common usage:

## Development:

* server: `npm start` ->  `localhost:8081/categories?name=Punk` || `localhost:8081/psychographics?label=Advertising`
* frontend: `npm run serve` -> `localhost:8080`

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
* `http://localhost`
