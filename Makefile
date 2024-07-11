####### COLORS #######

GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m


####### RULES #######


all :
	@docker compose -f docker-compose.yml build
	@docker compose -f docker-compose.yml up
	@echo "{GREEN}\n✨ Ft_Transcendence is ready and running on http://localhost:8000 ✨\n${NC}"

clean:
	@docker compose down

fclean: clean
	# @docker network rm pong_network
	@docker system prune -af
	@docker volume prune -f
	@echo "${GREEN}\n 🛁✨ All containers, networks, volumes and images have been removed ✨🛁\n${NC}"

re : fclean all

.PHONY: all clean fclean re




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