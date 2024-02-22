# syntax = docker/dockerfile:1

FROM desm/rsg-react-on-rails:latest

USER appserver
WORKDIR /home/appserver/app

USER root
RUN apt-get update
RUN apt-get install -y make gcc git default-libmysqlclient-dev xz-utils

COPY ./Gemfile ./Gemfile.lock /home/appserver/app/
RUN chown appserver:appserver Gemfile Gemfile.lock

USER appserver
RUN bundle install

RUN echo "PATH=/app/bin:\$PATH" >> ~/.bashrc
