FROM        python:3.12


# Set environment variables to prevent Python from writing .pyc files to disk and to buffer stdout and stderr
ENV PYTHONUNBUFFERED=1


# Set the working directory in the container
WORKDIR     /app


# Copy the requirements file into the container
COPY        project_requirements.txt /app/project_requirements
COPY        django-web-app/django_requirements.txt /app/django_requirements.txt


# Install the global dependencies
RUN         pip install --upgrade pip
RUN         pip install -r /app/project_requirements


# Set the working directory to the Django app directory
WORKDIR     /app/django-web-app


# Copy the current directory contents into the container
COPY        . /app/


# Install Django-specific dependencies
RUN         pip install -r django_requirements.txt



# Install PostgreSQL client libraries
RUN         apt-get update && apt-get install -y postgresql-client


# Expose the port the app runs on
EXPOSE      8000


# Command to run the application
CMD         ["python", "django-web-app/manage.py", "runserver", "0.0.0.0:8000"]