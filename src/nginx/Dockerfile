FROM nginx:latest

RUN apt-get update -y && \ 
	apt-get upgrade -y && \ 
	apt-get install -y nginx openssl && \ 
	mkdir -p /etc/nginx/ssl/ && \
	chmod 755 /etc/nginx/ssl/ && \
	openssl req -x509 \
		-newkey rsa:2048 \
		-nodes \
		-days 365 \
		-out /etc/nginx/ssl/inception.crt \
		-keyout /etc/nginx/ssl/inception.key \
		-subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=transcendance.42.fr/UID=transcendance" && \
	mkdir -p /var/run/nginx

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]