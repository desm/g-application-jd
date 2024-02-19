# syntax = docker/dockerfile:1

FROM desm/rsg-react-on-rails:latest

USER appserver
WORKDIR /home/appserver/app

# Add gems
#
# e.g.
# RUN bundle add _______

RUN echo "PATH=/app/bin:\$PATH" >> ~/.bashrc
