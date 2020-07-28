## ## GETTING IT STARTED


## from the root directory

docker build -t server .
then docker-compose run server npm run migrate

finally docker-compose up

alteratively run 
docker-compose up --remove-orphans --build

cleaning up dangling images
docker rmi $(docker images -f "dangling=true" -q)