# Development

## Requirements

- Git
- Docker
- Docker Compose
- OpenAI API Key (to try the AI Assistant feature)

Ruby, Rails, Node.js, and Yarn are not required as they are part of the Docker environment.

#### Tested on Ubuntu 22.04.4 LTS (Jammy Jellyfish) with the following software versions:

| software       | version |
| -------------- | ------- |
| git            | 2.34.1  |
| docker         | 25.0.4  |
| docker compose | v2.24.7 |

## Setup

- Clone the repo
- Run `source .autoenv`
- Run `up-sleep` to build and pull all Docker images
- run `connect` - this opens a shell in the "appserver" container
- in appserver container, run `yarn install` - this installs node modules
- in appserver container, run `rails db:prepare` - this sets up the database
- exit the container
- run `down` - this stops all containers
- `cp ./webapp/dev/.env-openai-tmpl ./webapp/dev/.env-openai` and add your OpenAI key
- run `up` - this starts all containers, and starts the Rails server

Here are some links that should work once the services are running:

- http://localhost:8080/ - A partial reproduction of the www.gumroad.com web site, made with Webflow
- http://localhost:8000/signup - Gumroad signup page
- http://localhost:8000/dashboard - Gumroad dashboard page
- http://localhost:8001/?server=db&username=root - DB Admin Tool (see database.yml "default" section for credentials)

## Shortcut Commands

Run `source .autoenv` to make use of these shortcuts.

| Command       | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| up            | Starts all services: Rails server, MySQL server, Adminer DB admin tool, nginx, Selenium Standalone |
| up-sleep      | Same as `up` except that the appserver sleeps instead of running Rails                             |
| logs          | Tails the appserver logs                                                                           |
| down          | Stops all services                                                                                 |
| connect       | Opens a shell in the appserver container                                                           |
| connect-root  | Opens a **root** shell in the appserver container                                                  |
| connect-smoke | Opens a shell in the smoke-test-runner container                                                   |

## Rails CLI

The `rails` command is available in the appserver container.

```shell
$ connect

(appserver) $ rails --help
```

## Adding Gems

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

## Rails Credentials File

The `config/master.key` is required to maintain the `credentials.yml.enc` file.

To edit the `credentials.yml.enc` file:

```shell
$ up-sleep

$ connect

(appserver) $ VISUAL=vi rails credentials:edit
```

## CI/CD

CI/CD is done using **GitHub Actions**.

**The code is tested & deployed** each time a commit is pushed to GitHub. This is configured via `.github/workflows/test-and-deploy.yml`.

## Testing

```shell
$ connect

# run all tests except for system tests
(appserver) $ rails test;
(appserver) $ rails test --name "name of test";
(appserver) $ LOGS=1 rails test; # prints server-side logs to STDOUT

# run frontend unit tests (tests under './webapp/__tests__' dir)
(appserver) $ jest;

# run system tests
(appserver) $ rails test:system;
(appserver) $ LOGS=1 rails test:system; # prints server-side logs to STDOUT

# typecheck TypeScript code
(appserver) $ shakapacker
```

### Smoke Testing Staging Environment

```shell
$ connect-smoke

# run smoke tests against staging env https://app.staging.gumroad.jacquesdesmarais.dev
(smoke-test-runner) $ rails test:system
```

## Testing The Production Build Locally

Note: since both the production and staging environments use the same build, we'll use `RAILS_ENV=staging` to test.

Edit `webapp/config/database.yml` so that the staging env looks like this:

```yml
staging:
  <<: *default
  database: appserver_development
```

Temporarily create a `.env-staging` in the root of the project that contains this:

```shell
RAILS_ENV=staging
RAILS_MASTER_KEY={value}
```

Then:

```shell
# build
$ docker compose -f docker-compose-staging.yml build

# start services
$ docker compose -f docker-compose-staging.yml up -d

# once done
$ docker compose -f docker-compose-staging.yml down
```
