# Gumroad Prototype

_Give a brief summary here_

## Requirements

- Git
- Docker
- Docker Compose
- AWS CLI
- AWS Copilot

Ruby, Rails, Node.js, and Yarn do not need to be installed locally, as they will be part of the Docker environment.

## Shortcut Commands

These instructions include the use of **bash aliases** that are defined in `.autoenv`.

To make use of these aliases, you can either:

- Install [autoenv](https://github.com/hyperupcall/autoenv?tab=readme-ov-file#installation-automated), then set env var `AUTOENV_ENV_FILENAME=.autoenv`
- Or source the .autoenv file: `source .autoenv`

Note that these commands are meant to be used from your local shell.
They are not meant to be used inside docker containers.

| Command              | Description                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| up                   | Starts all services needed for development: Rails server, MySQL server, Adminer DB admin tool, nginx                                      |
| up-sleep             | Same as `up` except that the appserver sleeps instead of running the Rails server                                                         |
| logs                 | Tails the appserver logs                                                                                                                  |
| down                 | Shortcut for `docker-compose down`                                                                                                        |
| connect              | Opens a shell in the appserver container                                                                                                  |
| connect-root         | Opens a **root** shell in the appserver container                                                                                         |
| build-production \*  | Builds the Docker image used in staging & production. Not required before deploying                                                       |
| deploy-staging \*    | Deploys to the staging env using AWS Copilot                                                                                              |
| deploy-production \* | Deploys to the production env using AWS Copilot                                                                                           |
| reload               | Reloads the `.autoenv` file, if you are using [autoenv](https://github.com/hyperupcall/autoenv?tab=readme-ov-file#installation-automated) |

\*: these commands require the `server/config/master.key` file to be present.

## Development

### Database Configuration

_Configure MySQL_

### Start Services

Start the services needed for development: Ruby on Rails, MySQL, Adminer (a DB management tool), nginx.

```shell
$ up

$ docker-compose ps
         Name                       Command               State                                         Ports
----------------------------------------------------------------------------------------------------------------------------------------------------
gumroad-jd_appserver_1   ./bin/dev                        Up      0.0.0.0:8000->3000/tcp,:::8000->3000/tcp, 0.0.0.0:3035->3035/tcp,:::3035->3035/tcp
gumroad-jd_db_1          docker-entrypoint.sh --def ...   Up      3306/tcp, 33060/tcp
gumroad-jd_adminer_1     entrypoint.sh php -S [::]: ...   Up      0.0.0.0:8001->8080/tcp,:::8001->8080/tcp
gumroad-jd_www_1         /docker-entrypoint.sh ngin ...   Up      0.0.0.0:8080->80/tcp,:::8080->80/tcp
```

Here are some links that should work once the services are running:

- http://localhost:8080/ - Gumroad web site, made with Webflow
- http://localhost:8000/signup - Gumroad signup page
- http://localhost:8000/dashboard - Gumroad dashboard page
- http://localhost:8001/?server=db&username=root - DB Admin Tool (see database.yml "default" section for credentials)

### Running rails CLI

```shell
$ connect

(appserver) $ rails --help
```

### Adding Gems

```shell
$ connect

# Add the gem from within the container. Use `--skip-install` in order to update the Gemfile only
(appserver) $ bundle add {gem} --skip-install

(appserver) $ exit

# Bring all running containers down
$ docker-compose down

# Run "up" again; this will INSTALL the Gem in the Docker image used for Development
$ up
```

### Running Tests

```shell
$ connect

(appserver) $ rails test; # runs tests in the 'test' dir (except for 'test/system'): unit, functional, integration

(appserver) $ rails test:system; # runs tests under 'test/system': headless browser tests

(appserver) $ jest; # runs tests under '__tests__' dir: frontend unit tests
```

Note: running 'jest' does not do type checking.

### Type Checking

One way to **type check** all TypeScript code is to run the following command:

```shell
$ connect

(appserver) $ shakapacker
```

## Master Key and Credentials File

The `config/master.key` file is required to deploy to staging or production.
It is also required to maintain the `credentials.yml.enc` file.

In case you want to edit the `credentials.yml.enc` file:

```shell
$ up-sleep

$ connect

(appserver) $ VISUAL=vi rails credentials:edit
```

## Tech Stack

### Application

- [Docker and Docker Compose](https://docs.docker.com/reference/)
- [Ruby](https://docs.ruby-lang.org/en/3.3/)
- [Ruby on Rails](https://guides.rubyonrails.org/)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React](https://react.dev/)
- [React on Rails](https://www.shakacode.com/react-on-rails/docs/)
- [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Web APIs (Mozilla) (e.g. "fetch")](https://developer.mozilla.org/en-US/docs/Web/API)

### Testing Libraries

- [Minitest](http://docs.seattlerb.org/minitest/)
- [Capybara](https://rubydoc.info/github/teamcapybara/capybara/master)
- [React Testing Library \_ Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)
- [Mock Service Worker V1 (msw)](https://v1.mswjs.io/docs/)

### Tools

- [Adminer - DB Management Tool](https://www.adminer.org/)
- [Debian Bookworm Packages (for Docker images)](https://packages.debian.org/bookworm/)
