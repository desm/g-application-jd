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
        help on what file is what:
            https://stackoverflow.com/questions/50389883/generate-crt-key-ssl-files-from-lets-encrypt-from-scratch
        puma docs:
            https://github.com/puma/puma
            https://msp-greg.github.io/puma/#binding-tcp-sockets

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

0- configure database
    Update docker-compose.yml file to use a volume "db-data"
    Restart docker process
    Change ownership of storage/db directory

    == root@appserver (cwd: /root)
    $ chown appserver:appserver /src/appserver/storage/db
    $ exit

    == appserver@appserver (cwd: /src/appserver)
    $ bin/rails db:create

    # ... thinking of switching to MySQL to have a better view of the database

0- code the handler for this request:
    https://gumroad.com/users/session_info
        {"success":true,"is_signed_in":false}
        {"success":true,"is_signed_in":true}

    Create models
        $ bin/rails generate model User name:string email_address:string password_digest:string active:boolean
        $ bin/rails generate model Session token:string ip_address:string user_agent:string last_active_at:datetime

    Added route:
        /users/session_info => app/controllers/users_controller.rb

0- Created a repo "gumroad_json" because Gist wasn't working
        GitHub Repo:
            https://github.com/desm/gumroad-json
            Checked out locally here: /proj/gumroad-json

        Had to turn on GitHub "Pages"
            https://github.com/desm/gumroad-json/settings/pages

        Created the following 2 endpoints:
            https://desm.github.io/gumroad-json/users/session_info/signed_in/
            https://desm.github.io/gumroad-json/users/session_info/not_signed_in/

0- completed mock of www.gumroad on Webflow
    what's working:
        dynamic login/dashboard buttons in navbar
        animated link underlining in navbar
        animated pop out "start selling" button
        animated on-scroll of "sticker" classes and callout-image

    what's not working:
        links and buttons don't work
        not responsive, desktop only

0- code login form
    use passowrd authentication

    When Gumroad stage things they use a url like:
        https://bundle-demo.apps.staging.gumroad.org/


figure out how to serve rails app from here
look at Gumroad code a bit to see if it is the same SPA no matter the page <---------
how to disable scripts on a page?
compare "/products" with other gumroad pages

query to find SSR React Components
    $(".react-entry-point")

Component IDs look like this
    id="Profile-react-component-917d145d-7efd-4187-83ee-2724cca20e2e"

app.gumroad.com/dashboard - Home
    components: Nav, DashboardPage

app.gumroad.com/products - Products
    components: Nav, SearchPopover, ProductsPage

app.gumroad.com/checkout/discounts - Checkout
    components: Nav, DiscountsPage

app.gumroad.com/posts - Emails
    components: Nav, SearchPopover, PostsPreviewPopover, PostsPublishPopover

app.gumroad.com/workflows - Workflows
    components: Nav, WorkflowsPage

app.gumroad.com/customers - Sales
    components: Nav, AudienceCustomersPage

app.gumroad.com/dashboard/sales - Analytics
    components: Nav, AnalyticsProductsPopover, DateRangePicker, AnalyticsSalesStats, AnalyticsLocationsTable

app.gumroad.com/balance - Payouts
    components: Nav, 

discover.gumroad.com - Discover
    components: Discover

app.gumroad.com/library - Library
    components: Nav, LibraryPage

help.gumroad.com - Help
    hosted by helpscout: https://www.helpscout.com/knowledge-base/?co=Gumroad&utm_source=docs&utm_medium=footerlink&utm_campaign=Docs+Branding

---------

gumroad.gumroad.com/
    ref: https://gumroad.gumroad.com/
    newsletter for Products? you can subscribe in top right
    components:
        - id="Profile-react-component-917d145d-7efd-4187-83ee-2724cca20e2e"

gumroad.gumroad.com/posts
    blog posts you can subscribe to
    components:
        - id="ProfilePostsPage-react-component-fc96d9a5-08b4-4bc4-85d0-deccefc0bf2d"

app.gumroad.com/d
    page to display digital product
    e.g. https://app.gumroad.com/d/7131090ae72e4a75e85458a378a40433
    components:
        - id="DownloadPageWithContent-react-component-f4cb331a-5d25-41de-8734-662695ce7ebe"



This is the library that is used:
    https://github.com/shakacode/react_on_rails/

Find out if Gumroad uses Redux
    it looks like it does

    After updating monolith/dockerfiles/Dockerfile.appserver with:
        RUN bundle add react_on_rails --strict

        The following Gems were installed in the container:
            Fetching execjs 2.9.1
            Fetching rainbow 3.1.1
            Installing rainbow 3.1.1
            Installing execjs 2.9.1
            Fetching react_on_rails 13.4.0
            Installing react_on_rails 13.4.0

    == appserver@appserver (cwd: /src/appserver)
    $ bin/rails generate react_on_rails:install

    scratch that

    Updated Gemfile with
        gem "react_on_rails"

    rebuilt container
    Rails no longer starts, need to debug issue
    issue is that there is missing javascript runtime
    need to build node.js into container

    + node --version
    v21.6.1
    + npm --version
    10.2.4
    + yarn --version
    1.22.19

    missing git
    now react on rails is complaining that it isn't being run in a git repo
    will need to change mounting point

added this to docker compose file:
    volumes:
      - ./src/appserver:/src/appserver
      - db-data:/src/appserver/storage/db
      - /proj/gumroad:/g <------------------------------- temporary, used to run bin/rails generate react_on_rails:install

    == docker
    cd /g/monolith/src/appserver
    bin/rails generate react_on_rails:install
