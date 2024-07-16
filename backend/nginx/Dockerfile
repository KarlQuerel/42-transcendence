FROM nginx:latest

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

COPY ./frontend /usr/share/nginx/html

RUN chmod 755 /usr/share/nginx/html/*

EXPOSE 8080

# localhost:8080