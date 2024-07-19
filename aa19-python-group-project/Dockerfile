FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN flask db upgrade
RUN flask seed all
CMD gunicorn --worker-class eventlet -w 1 app:app






# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY

# WORKDIR /var/www

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn --worker-class eventlet -w 1 app:app




# # Use the official image as a parent image
# FROM python:3.9.18-alpine3.18

# # Install build dependencies
# RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# # Set environment variables (these can be overridden at runtime)
# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY

# # Set environment variables in the container
# ENV FLASK_APP=$FLASK_APP \
#     FLASK_ENV=$FLASK_ENV \
#     DATABASE_URL=$DATABASE_URL \
#     SCHEMA=$SCHEMA \
#     SECRET_KEY=$SECRET_KEY

# WORKDIR /var/www

# # Copy and install dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application
# COPY . .

# # Ensure the environment variables are available for flask commands
# ENV PATH="/var/www/.local/bin:$PATH"

# # Run database migrations and seed data
# RUN flask db upgrade
# RUN flask seed all

# # Start the application with Gunicorn using eventlet worker
# CMD ["gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app"]
