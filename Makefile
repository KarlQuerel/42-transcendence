all :
	cd backend && docker-compose up -d --build

clean : 
	cd backend && docker-compose down

re : clean all

web : all
	xdg-open http://localhost:8080