#######		COLORS		#######
GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m

#######		RULES		#######
all :
	cd src && docker-compose up -d --build
	@echo "$(GREEN)\n✨ Ft_Transcendence is ready and running on http://localhost:8080 ✨\n$(NC)"

clean :
	cd src && docker-compose down

fclean :
	cd src && docker system prune -af
	cd src && docker volume prune -f
	@echo "$(GREEN)\n🛁✨ All containers, networks, volumes and images have been removed ✨🛁\n$(NC)"

re : fclean all

web :
	xdg-open http://localhost:8080

.PHONY: all clean fclean re web