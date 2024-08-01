#!/bin/bash

# Define variables
DB_NAME="pong_database"
DB_USER="pong_user"
DB_PASSWORD="pong_password"

# Start the PostgreSQL service (modify as needed for your environment)
echo "Starting PostgreSQL service..."
service postgresql start

# Wait for PostgreSQL to start
sleep 5

# Switch to the postgres user and execute the following commands
su postgres <<EOF
psql -lqt | cut -d \| -f 1 | grep -qw '${DB_BASENAME}'
EOF

if [ "$?" -eq "0" ]; then

	echo "Database already exists."

else

	su postgres <<EOF


  psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';"
  psql -c "CREATE DATABASE ${DB_BASENAME} OWNER ${DB_USER};"
  psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_BASENAME} TO ${DB_USER};"
  psql -c "GRANT ALL PRIVILEGES ON SCHEMA public TO ${DB_USER};"
EOF

echo "PostgreSQL User Database initialization completed."

fi
