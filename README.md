## ABOUT THIS PROJECT
This is a very barebones backend that I have thrown together using Express, Postgresql, and docker.

## getting it running from the root directory

docker build -t server .
docker-compose run server npm run migrate

finally docker-compose up

## alteratively run:

docker-compose up --remove-orphans --build
and in a new tab:
docker-compose run server npm run migrate



## other commands
docker-compose up postgres
  in a new terminal tab:
cd server && npm run pm2
  useful for building out changes locally on the server without having to rebuild the server docker image to see changes

docker rmi $(docker images -f "dangling=true" -q)
  garbage collection for dangling images 

cd server && npm run test
  runs the jest test suite currently built.

## Other Info
Because of the way docker caches the server image, you will need to rebuild after making changes locally,
$ docker-compose up --build  will rebuild the server image before relaunching.

I attempted to build out a cli, currently having some issues. Will update with more info once it's working