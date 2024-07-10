# all: 
# 	sudo mkdir -p /home/jrouillo/data/mariadb
# 	sudo mkdir -p /home/jrouillo/data/wordpress
# 	sudo chmod 777 /home/jrouillo/data/mariadb
# 	sudo chmod 777 /home/jrouillo/data/wordpress

# 	sudo docker compose -f ./srcs/docker-compose.yml build
# 	sudo docker compose -f ./srcs/docker-compose.yml up -d

# logs:
# 	sudo docker logs wordpress
# 	sudo docker logs mariadb
# 	sudo docker logs nginx

# clean:
# 	sudo docker container stop nginx mariadb wordpress

# fclean: clean
# 	@sudo rm -rf /home/jrouillo/data/mariadb/*
# 	@sudo rm -rf /home/jrouillo/data/wordpress/*
# 	@sudo docker network rm inception
# 	@sudo docker system prune -af

# re: fclean all

# .Phony: all logs clean fclean