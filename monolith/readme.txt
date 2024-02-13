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

    Update docker-compose.yml so that Rails server starts up automatically

7- get HTTPS to work
    generate SSL certificate for app.gumroad.jacquesdesmarais.dev from Let's Encrypt
    instructions to use Certbot: https://certbot.eff.org/instructions?ws=other&os=debianbuster

    Create AWS EC2 instance

    == on EC2
    $ sudo snap install --classic certbot
    $ sudo certbot certonly --standalone --register-unsafely-without-email
    $ sudo certbot --nginx --register-unsafely-without-email
    $ sudo certbot --apache --register-unsafely-without-email

    Update ./monolith/dockerfiles/Dockerfile.appserver to copy cert files under /root

    Update config/environments/development.rb
        Add "app.gumroad.jacquesdesmarais.dev" to config.hosts

    Update docker-compose.yml to run Rails server like this:
        $ rails s puma -b 'ssl://0.0.0.0:9292?key=path_to_key.key&cert=path_to_cert.crt&verify_mode=none&ca=path_to_root_bundle.crt'

8- expose Rails server to internet
    Assign static IP to AWS EC2
        Associate Elastic IP address so that when stop/start stays the same
        Got 50.16.81.26
    Set up DNS app.gumroad.jacquesdesmarais.dev
        A record to 50.16.81.26
    Set up SSH Remote Port Forwarding (see ~/.ssh/config)
        $ slogin g
    On EC2, use "socat" to forward traffic
        $ sudo socat TCP-LISTEN:443,fork TCP:localhost:9943

    Test with:
    $ curl https://app.gumroad.jacquesdesmarais.dev/users/session_info

9 - code handler for this request:
    https://gumroad.com/users/session_info
        {"success":true,"is_signed_in":false}
        {"success":true,"is_signed_in":true}

