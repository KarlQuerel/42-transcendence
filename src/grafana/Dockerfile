FROM grafana/grafana

USER root

RUN	apk update && apk upgrade && apk add openssl
RUN mkdir -p /etc/grafana/ssl
RUN	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/grafana/ssl/grafana.key -out /etc/grafana/ssl/grafana.crt -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=transcendance.42.fr/UID=transcendance"

COPY ./dashboards.yml /etc/grafana/provisioning/dashboards/dashboards.yml
COPY ./datasources.yml /etc/grafana/provisioning/datasources/datasources.yml
COPY ./dashboards.json /var/lib/grafana/dashboards/dashboards.json
COPY ./grafana.ini /etc/grafana/grafana.ini