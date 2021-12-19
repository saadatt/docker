PROJECT_NAME=my_node
PORTS=3001:3001

build:
	docker build --build-arg PORT_ARG=3001 -t $(PROJECT_NAME) .

run: build
	docker run -it --rm -p $(PORTS) --network pasv --env-file .env --name $(PROJECT_NAME) $(PROJECT_NAME)

stop:
	docker stop $(PROJECT_NAME)

db:
	docker run -it --rm --network pasv --name mysql -e MYSQL_ROOT_PASSWORD=0000 -d -v $(shell pwd)/data:/var/lib/mysql mysql:8

exec:
	docker exec -it mysql mysql -uroot -p mysql

up:
	docker-compose up -d

down:
	docker-compose down
