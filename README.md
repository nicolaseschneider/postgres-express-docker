## ## GETTING IT STARTED


## from the root directory

docker build -t server .
docker-compose run server npm run migrate

finally docker-compose up

## alteratively run:

docker-compose up --remove-orphans --build
and in a new tab:
docker-compose run server npm run migrate



## other commands
docker-compose up postgres
  useful for building out changes on the server without having to rebuild the server image to see changes

docker rmi $(docker images -f "dangling=true" -q)
  garbage collection for dangling images 