FROM	python:3.10


RUN		apt update && apt upgrade -y
#Install PostgreSQL dependencies
# RUN		apt install -y libpq-dev

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY initiation_files/requirements.txt /app/initiation_files/requirements.txt

#Install django and its depenencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install -r /app/initiation_files/requirements.txt

# Copy the rest of the application code
COPY . /app

#voir avec les autres quel port
EXPOSE 8000

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Run the command to start uWSGI
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]