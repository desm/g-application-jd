steps

1- organize files and copy from other project
    decisions:
    - docker container will be running as "root"
    - it will have a "appserver" user, which will have same uid/gid as docker host user "desm": 1000:1000

2- check docker daemon /etc/docker/daemon.conf
    it is set to "{}"

3- build Docker container step 1, with only Rails installed
    == shell (cwd: /proj/gumroad/monolith)
    $ docker-compose -f ./docker-compose-base.yml build

4- create Rails app
    == shell (cwd: /proj/gumroad/monolith)
    $ mkdir ./src/appserver
    $ cp ./gemfiles/rails-7.1.3/Gemfile ./src/appserver
    $ docker-compose up -d
    $ appserver-connect

    == appserver@appserver (cwd: /src/appserver)
    $ bundle exec rails new --force --skip-bundle .
    $ exit

    == shell (cwd: /proj/gumroad/monolith)
    $ docker-compose down

5- build Docker container step 2, with all Gems required by new Rails project installed
    == shell (cwd: /proj/gumroad/monolith)
    $ docker-compose up -d --build

6- start Rails server
    == shell (cwd: /proj/gumroad/monolith)
    $ appserver-connect

    == appserver@appserver (cwd: /src/appserver)
    $ ./bin/rails server --binding=0.0.0.0

    Server should now be accessible on port 8080

