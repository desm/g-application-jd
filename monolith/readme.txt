steps

1- organize files and copy from other project
    decisions:
    - docker container will be running as "root"
    - it will have a "appserver" user, which will have same uid/gid as docker host user "desm": 1000:1000

2- check docker daemon /etc/docker/daemon.conf
    it is set to "{}"

3- create docker-compose.yml
    create "appserver" container
    container is built using ./dockerfiles/Dockerfile.appserver
        ruby 3.3.0.rc1
        rails (7.1.3)

    == appserver@appserver
    $ cd /src/appserver
    $ bundle show
    $ bundle env
    $ bundle exec rails new appserver

