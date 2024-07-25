all :
	cd src && docker-compose up -d --build

clean : 
	cd src && docker-compose down
	docker system prune -af

re : clean all

web : all
	xdg-open http://localhost:8080

.PHONY: all clean re web