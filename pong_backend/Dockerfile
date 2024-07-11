# Official Python image from the Docker Hub
FROM python:3.10-slim


RUN pip install django

# Set environment variables to prevent Python from writing .pyc files to disk and to buffer stdout and stderr
ENV PYTHONUNBUFFERED=1


# Set the working directory in the container
WORKDIR /app


# Copy the requirements file into the container at /app
COPY pong_backend/requirements.txt /app/


# Install dependencies
RUN pip3 install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt


# Copy the entire project into the container
COPY . /app/


# Expose port 8000 to the outside world
EXPOSE 8000


# Run the application
CMD ["python3", "/pong_backend/manage.py", "runserver"]