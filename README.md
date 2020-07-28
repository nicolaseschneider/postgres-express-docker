## ABOUT THIS PROJECT
This is a very barebones backend that I have thrown together using Express, Postgresql, and docker.

Make sure you have Docker installed!
docker is great for packaging apps

## getting it running from the root directory
cd server && npm install
cd ..
docker build -t server .
docker-compose run server npm run migrate

finally docker-compose up

## alteratively run:

docker-compose up --remove-orphans --build
and in a new tab:
docker-compose run server npm run migrate



## other commands
docker-compose up postgres
  - spins up the postgres image
  - this SHOULD pull the existing docker image if you dont currently have it locally
  - in a new terminal tab:
cd server && npm install && npm run pm2
  - runs the server outside of the docker container, useful when making changes before rebuilding the docker image.
  - no need to npm install beyond the first time

docker rmi $(docker images -f "dangling=true" -q)
  - garbage collection for dangling images 

cd server && npm run test
  - runs the jest test suite currently built.
  - currently really only tests to see if the database is working

## Other Info
Because of the way docker caches the server image, you will need to rebuild after making changes locally,
 - $ docker-compose up --build  will rebuild the server image before relaunching.

I attempted to build out a cli, currently having some issues. Will update with more info once it's working

## nico-cli
interact with this CLI by using:
- $ sudo bash ./nico-cli
This CLI should be able to get a local environment up and running for you quickly
more commands to be added soon

## TODO
add Babel as a package and convert everything to ES6 Syntax.
  - import x from 'y' is a million times more readable than var x = require('y')

add some sort of filewatching for local development
  - restarting the server every time gets a lil old

add a migrations folder rather than just defining models in the database folder
  - currently everything just sits in the database.js not best practice, but fine for a barebones project

Typescript conversion
  - type safety is my friend

build out actual database seeding for local environment
  - something nice
