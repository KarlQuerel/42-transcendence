FROM nginx:latest

RUN	mkdir -p /etc/nginx/ssl/ && \
	chmod 755 /etc/nginx/ssl/ && \
	openssl req -x509 \
		-newkey rsa:2048 \
		-nodes \
		-days 365 \
		-out /etc/nginx/ssl/ft_transcendance.crt \
		-keyout /etc/nginx/ssl/ft_transcendance.key \
		-subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=cbernaze.42.fr/UID=cbernaze"

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

COPY ../../frontend /usr/share/nginx/html

EXPOSE 443