#######		COLORS		#######
GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m

#######		GENERAL RULES		#######
all :
	@cd src && docker-compose up -d --build
	@make fill_db
	@echo "$(GREEN)\n✨ Ft_Transcendence is ready and running on https://localhost:4430 ✨\n$(NC)"

clean :
	@cd src && docker-compose down

fclean : clean
	cd src && docker system prune -af
	cd src && docker volume prune -af
	@echo "$(GREEN)\n🛁✨ All containers test, networks, volumes and images have been removed ✨🛁\n$(NC)"

re : fclean all

#######		DOCKER CONTAINERS		#######

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


#######		DJANGO		#######

# Apply changes to database

makemigrations_dashboard:
	docker exec -it Dashboard bash -c "python manage.py makemigrations && python manage.py migrate"

# Populate database with pre-defined users and games

fill_db:
	docker exec -it User bash -c "python manage.py makemigrations && python manage.py migrate && python manage.py populate_user_db"
	docker exec -it Dashboard bash -c "python manage.py makemigrations && python manage.py migrate && python manage.py populate_dashboard_db"

# Check database

check_allUsers:
	docker exec -it Database bash -c "psql -U postgres -d pong_database -c 'SELECT * FROM api_user_customuser;'"

check_allGameHistory:
	docker exec -it Database bash -c "psql -U postgres -d pong_database -c 'SELECT * FROM base_gamehistory;'"

check_userGamehistory:
	@read -p "Enter username: " username; \
	docker exec -it Database bash -c "psql -U postgres -d pong_database -c \"SELECT base_gamehistory.* FROM base_gamehistory JOIN api_user_customuser ON base_gamehistory.user_id = api_user_customuser.id WHERE api_user_customuser.username = '$$username';\""

# Clear database

clear_db:
	docker exec -it Dashboard bash -c "python manage.py makemigrations && python manage.py migrate && python manage.py clear_db"


.PHONY: all clean fclean re logs logs-nginx logs-profile logs-user logs-database logs-dashboard-container check_allGameHistory check_currentGameHistory check_allUsers fill_db clear_db makemigrations_dashboard
