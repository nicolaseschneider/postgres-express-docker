## ## GETTING IT STARTED


## from the root directory

cd server
npm install
cd ..
then docker build -t dockerize-test .
then docker-compose run dockerize-test npm run migrate
finally docker-compose up

alteratively run 
docker-compose up --remove-orphans --buil