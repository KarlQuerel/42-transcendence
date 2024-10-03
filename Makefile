#######		COLORS		#######
GREEN = \033[0;32m
RED = \033[0;31m
NC = \033[0m

#######		RULES		#######
all :
	cd src && docker-compose up -d --build
	@echo "$(GREEN)\n✨ Ft_Transcendence is ready and running on https://localhost:4430 ✨\n$(NC)"

clean :
	cd src && docker-compose down

fclean : clean
	cd src && docker system prune -af
	cd src && docker volume prune -af
	@echo "$(GREEN)\n🛁✨ All containers test, networks, volumes and images have been removed ✨🛁\n$(NC)"

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

# DJANGO

fill_dashboard: #populate database
	docker exec -it Dashboard bash -c "python manage.py makemigrations && python manage.py migrate && python manage.py populate_dashboard_db"

fill_user:
	docker exec -it User bash -c "python manage.py makemigrations && python manage.py migrate && python manage.py populate_user_db"

erase_user:
# docker exec -it User bash -c "python manage.py makemigrations && python manage.py migrate"
# docker exec -it User bash -c "python manage.py flush --no-input"

erase_dashboard:
# docker exec -it Dashboard bash -c "python manage.py clear_db"
	docker exec -it Dashboard bash -c "python manage.py makemigrations && python manage.py migrate"
	docker exec -it Dashboard bash -c "echo \"BEGIN; TRUNCATE TABLE friends_friendrequest CASCADE; TRUNCATE TABLE api_user_customuser CASCADE; COMMIT;\" | psql -h Database -U postgres -d pong_database"

check_dashboard_db:
	docker exec -it Database bash -c "psql -U postgres -d pong_database -c 'SELECT * FROM base_stats;'"
	docker exec -it Database bash -c "psql -U postgres -d pong_database -c 'SELECT * FROM base_gamehistory;'"

check_user_db:
	docker exec -it Database bash -c "psql -U postgres -d pong_database -c 'SELECT * FROM api_user_customuser;'"

fill_db: fill_user fill_dashboard

erase_db: erase_dashboard erase_user


.PHONY: all clean fclean re logs logs-nginx logs-profile logs-user logs-database logs-dashboard-container fill_dashboard fill_user erase_fill_user erase_fill_dashboard check_dashboard_db check_user_db fill_db erase_db
