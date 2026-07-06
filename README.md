<a id="top"></a>

![Demo](./src/demo/demo.gif)

# ft_transcendence
`ft_transcendence` is a full-stack, multi-service web application built as the capstone project of the 42 curriculum: a Pong platform with user accounts, friends, live presence, a stats dashboard, and a full monitoring stack — all orchestrated with Docker.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Team](#team)

## Introduction
The project pairs a single-page front-end with a REST back-end split across independent microservices behind an Nginx reverse proxy. It covers authentication, live user presence, responsive design, and observability, demonstrating proficiency in both server-side and client-side development.

## Features
- **Secure Authentication:** Token-based login (JWT) with optional email Two-Factor Authentication (TOTP).
- **Play Modes:** Solo against a tunable AI opponent, local 1v1, and multi-round local tournaments.
- **Friends & Live Presence:** Send/accept friend requests and see who is online in real time (WebSockets).
- **Customizable Profiles:** Avatars and personal information.
- **Dashboards & Leaderboard:** Per-user game history and statistics, plus a global ranking.
- **Live Monitoring:** Prometheus + Grafana dashboards for real-time service and website metrics.
- **GDPR Compliance:** Consent flow, privacy policy, and a personal-data export.
- **Microservices Architecture:** Independent, containerized services behind Nginx.

## Architecture
```
Browser --> Nginx (HTTPS) --> User service      (Django, :8200)
                          \-> Dashboard service (Django, :8100)
                                    \-> PostgreSQL
Prometheus <-- nginx / postgres / node exporters --> Grafana
```

## Technologies Used
### Front-End
- Vanilla JS single-page app with a custom client-side router
- Bootstrap 5 + jQuery (CDN) for responsive UI

### Back-End
- Django + Django REST Framework (two services: User, Dashboard)
- SimpleJWT for auth, pyotp for email 2FA
- Django Channels + Redis for live presence (WebSockets)
- Gunicorn

### Database
- PostgreSQL

### Monitoring
- Prometheus + Grafana (nginx / postgres / node exporters)

### Deployment
- Docker Compose (9 containers), Nginx reverse proxy (HTTPS)

## Installation
1. Clone this repository to your local machine:
	```sh
	git clone https://github.com/KarlQuerel/42-transcendence.git
	```

2. Navigate to the project directory:
	```sh
	cd 42-transcendence
	```

3. Create the environment file (default values run locally as-is):
	```sh
	cp src/.env.example src/.env
	```

4. Compile the project using `make`:
	```sh
	make
	```

## Usage
To access and use the web application, open your web browser and navigate to:
```bash
https://localhost:4430
```

For more information, refer to the [subject PDF](https://github.com/KarlQuerel/42-transcendence/blob/main/docs/en.subject.pdf).

## Team
Built by a team of 4 at 42:
- [Carolina Somarriba](https://github.com/casomarr)
- [Jessica Rouillon](https://github.com/JessicaRouillon)
- [Clement Bernazeau](https://github.com/ClementBrz)
- [Karl Querel](https://github.com/KarlQuerel)

[Back to Top](#top)
