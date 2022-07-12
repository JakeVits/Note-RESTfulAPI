FROM python:3.8-slim-buster

RUN apt update && apt upgrade -y

ENV PYTHONBUFFERED 1

WORKDIR /app

COPY . .

# super important for configuring python & mysql
RUN apt-get install -y python3-dev default-libmysqlclient-dev build-essential

# RUN /bin/sh -c apk-get install mysql-client

RUN pip install -r requirements.txt

# RUN python manage.py runserver 0.0.0.0:8000