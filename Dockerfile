# syntax = docker/dockerfile:1

# https://hub.docker.com/_/nginx
# https://github.com/nginxinc/docker-nginx/tree/1f227619c1f1baa0bed8bed844ea614437ff14fb/mainline/debian
FROM nginx:bookworm

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y procps inetutils-ping dropbear dropbear-bin curl xz-utils

COPY id_rsa.pub /root/.ssh/authorized_keys
RUN chmod 700 /root/.ssh
RUN chmod 600 /root/.ssh/authorized_keys

COPY index.html /usr/share/nginx/html
COPY start-sshd.sh /docker-entrypoint.d/

EXPOSE 22
