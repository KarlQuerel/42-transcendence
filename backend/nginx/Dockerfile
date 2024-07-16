FROM nginx:latest

# RUN apt-get update && \
# 	apt-get upgrade -y && \
#     apt-get install -y curl && \
#     curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
#     apt-get install -y nodejs

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

COPY ./frontend /usr/share/nginx/html

RUN chmod 755 /usr/share/nginx/html/*

# RUN npm -v

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

# localhost:8080