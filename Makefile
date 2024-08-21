####### COLORS #######

GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m


####### RULES #######


all :
	docker compose -f docker-compose.yml build; \
	docker compose -f docker-compose.yml up -d; \
	echo "$(GREEN)\n✨ Ft_Transcendence is ready and running on http://localhost:8000 ✨\n$(NC)"

clean:
	@docker compose down

fclean: clean
	# @docker network rm pong_network
	@docker system prune -af
	@docker volume prune -f
	@echo "$(GREEN)\n 🛁✨ All containers, networks, volumes and images have been removed ✨🛁\n$(NC)"

re : clean all

.PHONY: all clean fclean re
