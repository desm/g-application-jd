# syntax = docker/dockerfile:1

FROM desm/rsg-react-on-rails:latest

USER appserver
WORKDIR /home/appserver/app

USER root
RUN apt-get update
RUN apt-get install -y make gcc git default-libmysqlclient-dev xz-utils

# Install packages required by Selenium + Headless Chrome + Chrome
# ref: https://packages.debian.org/bookworm/libs/
RUN apt-get install -y libglib2.0-0 \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libxkbcommon0 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    vim-tiny

COPY ./Gemfile ./Gemfile.lock /home/appserver/app/
RUN chown appserver:appserver Gemfile Gemfile.lock

USER appserver
RUN bundle install

RUN echo "PATH=/app/bin:\$PATH" >> ~/.bashrc
RUN echo "alias jest=./node_modules/.bin/jest" >> ~/.bashrc
