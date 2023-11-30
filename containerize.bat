@echo on

docker volume create db-vol

docker network create app-api
docker network create app-ui
docker network create app-kafka

docker build -t zookeeper:img -f .\Dockerfile.zookeeper .
docker run --rm -p 2181:2181 -d --network app-kafka --name zookeeper-cntr zookeeper:img

docker build -t kafka:img -f .\Dockerfile.kafka . 
docker run --rm -p 9092:9092 -p 29092:29092 -d --network app-kafka --name kafka-cntr kafka:img 

docker build -t mysqldb:v1 .
docker run --rm -p 3307:3306 -v db-vol:/var/lib/mysql --name mysqldb --net app-api -d mysqldb:v1

timeout /t 5 /nobreak

docker exec -it kafka-cntr kafka-topics --create --bootstrap-server localhost:9092 --topic __consumer_offsets --partitions 50 --replication-factor 1

docker build -t frontend:v1 -f ./Frontend/Dockerfile ./Frontend
docker run --rm --name frontend-cntr -p 4200:4200 -d --network app-ui frontend:v1

docker build -t backend:v1 -f ./Backend/Dockerfile ./Backend
docker run --rm --name backend-cntr -p 3000:3000 -e MYSQL_USERNAME=root -e MYSQL_PASSWORD=Passw@rd -d --network app-api backend:v1

docker network connect app-ui backend-cntr
docker network connect app-kafka backend-cntr

pause