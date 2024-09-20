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

fclean : clean
	cd src && docker system prune -af
	cd src && docker volume prune -af
	@echo "$(GREEN)\n🛁✨ All containers, networks, volumes and images have been removed ✨🛁\n$(NC)"

re : fclean all

logs:
	cd src && docker-compose logs -f

logs-nginx:
	cd src && docker-compose logs -f nginx

logs-profile:
	cd src && docker-compose logs -f profile

logs-dashboard:
	cd src && docker-compose logs -f dashboard

logs-database:
	cd src && docker-compose logs -f database

fill: #populate database
	docker exec -it Dashboard bash -c "python manage.py makemigrations && python manage.py populate_db && python manage.py runserver"
# docker exec -it Dashboard bash -c "python manage.py makemigrations"


# unfill: #clear database
# 	docker exec -it Dashboard bash -c "python manage.py clear_db && python manage.py runserver"

.PHONY: all clean fclean re logs logs-nginx logs-profile logs-dashboard logs-database