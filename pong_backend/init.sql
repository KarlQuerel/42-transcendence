-- Create the database
CREATE DATABASE mydatabase;

-- Create the user with password
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;