FROM nginx:latest

RUN apt install curl -y

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]