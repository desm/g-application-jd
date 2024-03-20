# Gumroad JD

Tiny reproduction of a couple of UX flows of gumroad.com.

## Requirements

- Git
- Docker
- Docker Compose

Ruby, Rails, Node.js, and Yarn do not need to be installed locally, as they will be part of the Docker environment.

### Optional

- AWS CLI
- AWS Copilot

## Getting Started

- Check out repository
- run `up-sleep` - this builds and pulls all Docker images
- run `connect` - this opens a shell in the "appserver" container
- in appserver container, run `yarn install` - this installs node modules
- in appserver container, run `rails db:prepare` - this sets up the database
- exit the container
- run `down` - this stops all containers
- run `up` - this starts all containers, and starts the Rails server

## Shortcut Commands

These instructions include the use of **bash aliases** that are defined in `.autoenv`.

To make use of these aliases, you can either:

- Install [autoenv](https://github.com/hyperupcall/autoenv?tab=readme-ov-file#installation-automated), then set env var `AUTOENV_ENV_FILENAME=.autoenv`
- Or source the .autoenv file: `source .autoenv`

Note that these commands are meant to be used from your local shell.
They are not meant to be used inside docker containers.

| Command              | Description                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| up                   | Starts all services: Rails server, MySQL server, Adminer DB admin tool, nginx, Selenium Standalone                                        |
| up-sleep             | Same as `up` except that the appserver sleeps instead of running the Rails server                                                         |
| logs                 | Tails the appserver logs                                                                                                                  |
| down                 | Stops all services                                                                                                                        |
| connect              | Opens a shell in the appserver container                                                                                                  |
| connect-root         | Opens a **root** shell in the appserver container                                                                                         |
| build-production \*  | Builds the Docker image used in staging & production. Not required before deploying                                                       |
| deploy-staging \*    | Deploys to the staging env using AWS Copilot                                                                                              |
| deploy-production \* | Deploys to the production env using AWS Copilot                                                                                           |
| reload               | Reloads the `.autoenv` file, if you are using [autoenv](https://github.com/hyperupcall/autoenv?tab=readme-ov-file#installation-automated) |

\*: these commands require a copy of `server/config/master.key`.

## Development

### Start Services

Start the services needed for development: Rails, MySQL, Adminer, nginx, Selenium.

```shell
$ up

$ docker compose ps
NAME                               IMAGE                                        COMMAND                  SERVICE               CREATED       STATUS       PORTS
gumroad-jd-adminer-1               adminer:4.8.1-standalone                     "entrypoint.sh php -…"   adminer               3 hours ago   Up 3 hours   0.0.0.0:8001->8080/tcp, :::8001->8080/tcp
gumroad-jd-appserver-1             gumroad-jd-appserver                         "./bin/dev"              appserver             3 hours ago   Up 3 hours   0.0.0.0:3035->3035/tcp, :::3035->3035/tcp, 0.0.0.0:8000->3000/tcp, :::8000->3000/tcp
gumroad-jd-db-1                    mysql:8.0.36-debian                          "docker-entrypoint.s…"   db                    3 hours ago   Up 3 hours   3306/tcp, 33060/tcp
gumroad-jd-selenium-standalone-1   selenium/standalone-chrome:4.18.1-20240224   "/opt/bin/entry_poin…"   selenium-standalone   3 hours ago   Up 3 hours   0.0.0.0:4444->4444/tcp, :::4444->4444/tcp, 5900/tcp
gumroad-jd-smoke-test-runner-1     gumroad-jd-smoke-test-runner                 "sh -c 'while :; do …"   smoke-test-runner     3 hours ago   Up 3 hours
gumroad-jd-www-1                   nginx:bookworm                               "/docker-entrypoint.…"   www                   3 hours ago   Up 3 hours   0.0.0.0:8080->80/tcp, :::8080->80/tcp
```

Here are some links that should work once the services are running:

- http://localhost:8080/ - A partial reproduction of the www.gumroad.com web site, made with Webflow
- http://localhost:8000/signup - Gumroad signup page
- http://localhost:8000/dashboard - Gumroad dashboard page
- http://localhost:8001/?server=db&username=root - DB Admin Tool (see database.yml "default" section for credentials)

### Running rails CLI

The `rails` command is available in the appserver container.

```shell
$ connect

(appserver) $ rails --help
```

### Adding Gems

Adding gems is a 2-step process.

**Step 1**: Add the gem to the Gemfile from inside the appserver container, but without installing the gem just yet

```shell
$ connect

# Add the gem from within the container. Use `--skip-install` in order to update the Gemfile only
(appserver) $ bundle add {gem} --skip-install

(appserver) $ exit
```

**Step 2**: Restart the containers. The changes to the Gemfile will cause the gems to be installed inside the container

```shell

# Bring all running containers down
$ down

# Run "up" again; this will INSTALL the Gem in the Docker image used for Development
$ up
```

### Running Tests

```shell
$ connect

# run all tests except for system tests
(appserver) $ rails test;
(appserver) $ LOGS=1 rails test; # prints server-side logs to STDOUT

# run frontend unit tests (tests under './server/__tests__' dir)
(appserver) $ jest;

# run system tests
(appserver) $ rails test:system;
(appserver) $ LOGS=1 rails test:system; # prints server-side logs to STDOUT
```

Note: running 'jest' does not do type checking.

### Smoke Testing Staging Environment

```shell
$ connect-smoke

# run smoke tests against staging env https://app.staging.gumroad.jacquesdesmarais.dev
(smoke-test-runner) $ rails test:system;
```

### Type Checking

One way to **type check** all TypeScript code is to run the following command:

```shell
$ connect

(appserver) $ shakapacker
```

### Master Key and Credentials File

The `config/master.key` file is required to deploy to staging or production.
It is also required to maintain the `credentials.yml.enc` file.

In case you want to edit the `credentials.yml.enc` file:

```shell
$ up-sleep

$ connect

(appserver) $ VISUAL=vi rails credentials:edit
```

## CI/CD

CI/CD is done using **GitHub Actions**.

**The code is tested** each time a commit is pushed to GitHub. This is configured via `.github/workflows/test.yml`. Past test runs can be found here: [Test · Workflow runs](https://github.com/desm/gumroad-jd/actions/workflows/test.yml).

**The code is deployed** when a tag is pushed that matches the pattern `deploy-*`. This is configured via `.github/workflows/deploy-ecs.yml`. Past deployments can be found here: [Test & Deploy to Amazon ECS · Workflow runs](https://github.com/desm/gumroad-jd/actions/workflows/deploy-ecs.yml).

```shell
# tag the commit to deploy. If "ref" is not specified, then HEAD is tagged
$ git tag deploy-20240319-01 [ref]

# push the tag to GitHub
$ git push origin deploy-20240319-01
```

## Tech Stack

### Application

- [GitHub - desm/gumroad-jd](https://github.com/desm/gumroad-jd)
- [Docker and Docker Compose](https://docs.docker.com/reference/)
- [Ruby](https://docs.ruby-lang.org/en/3.3/)
- [Ruby on Rails](https://guides.rubyonrails.org/)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React](https://react.dev/)
- [React on Rails](https://www.shakacode.com/react-on-rails/docs/)
- [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Web APIs (Mozilla) (e.g. "fetch")](https://developer.mozilla.org/en-US/docs/Web/API)
- [React Hook Form](https://react-hook-form.com/)

### Testing Libraries For Rails

- [Minitest](http://docs.seattlerb.org/minitest/)
- [Capybara](https://rubydoc.info/github/teamcapybara/capybara/master)
- [capybara 3.39.2 API](https://rubydoc.info/gems/capybara/3.39.2/index)
- [selenium-webdriver 4.16 API](https://www.rubydoc.info/gems/selenium-webdriver/4.16.0/index)
- [selenium-devtools V122 API](https://www.rubydoc.info/gems/selenium-devtools/Selenium/DevTools/V122)

### Testing Libraries For Jest

- [React Testing Library \_ Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)
- [Mock Service Worker V1 (msw)](https://v1.mswjs.io/docs/)

### Tools

- [AWS Copilot CLI](https://aws.github.io/copilot-cli/docs/overview/)
- [Adminer - DB Management Tool](https://www.adminer.org/)
- [Debian Bookworm Packages (for Docker images)](https://packages.debian.org/bookworm/)
- [GitHub Actions](https://docs.github.com/en/actions/quickstart)
