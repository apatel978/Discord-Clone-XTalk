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
# CMD gunicorn app:app


FROM python:3.9.18-alpine3.18

# Install necessary build dependencies in a single layer to reduce image size
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set environment variables for Flask and database
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

ENV FLASK_APP=$FLASK_APP
ENV FLASK_ENV=$FLASK_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV SCHEMA=$SCHEMA
ENV SECRET_KEY=$SECRET_KEY

WORKDIR /var/www

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt \
    && pip install psycopg2-binary

# Copy the rest of the application code
COPY . .

# Ensure Flask-Migrate commands can be run
RUN flask db upgrade \
    && flask seed all

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["gunicorn", "-k", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker", "-w", "1", "app:app"]
