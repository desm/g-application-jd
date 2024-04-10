# Development

## Requirements

- Git
- Docker
- Docker Compose
- OpenAI API Key (to try the AI Assistant feature)

Ruby, Rails, Node.js, and Yarn are not required as they are part of the Docker environment.

#### Tested on Ubuntu 22 with: git 2.34.1, docker 25.0.4, docker compose v2.24.7

#### Tested on macOS 10.15.7 with: git 2.42.0, docker 20.10.21, docker compose v2.13.0

## Setup

1. Clone the repo
1. Download the `config/master.key` file and place it in `./webapp/config`
    - (Download from Notion site mentioned in job application)
1. Run `cp ./webapp/.env-template ./webapp/.env`, and set RAILS_MASTER_KEY
1. Run `source .autoenv`
1. Run `up-sleep` to build and pull all Docker images
1. Run `connect` to open a shell in the "appserver" container
    1. Run `yarn install` (in the container)
    1. Run `rails db:prepare` (in the container)
1. Exit the container
1. Run `down` to stop all containers
1. Run `up` - this starts all containers, and starts the Rails server

Some links that should work once the services are running:

- http://localhost:8080/ - A partial reproduction of the www web site, made with Webflow
- http://localhost:8000/signup - signup page
- http://localhost:8001/?server=db&username=root - DB Admin Tool (see database.yml "default" section for credentials)

## Shortcut Commands

Run `source .autoenv` to use these shortcuts.

| Command      | Description                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| up           | Starts all services: Rails server, MySQL server, Adminer DB admin tool, nginx, Selenium Standalone |
| up-sleep     | Same as `up` except that the appserver sleeps instead of running Rails                             |
| logs         | Tails the appserver logs                                                                           |
| down         | Stops all services                                                                                 |
| connect      | Opens a shell in the appserver container                                                           |
| connect-root | Opens a **root** shell in the appserver container                                                  |

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

To edit the `credentials.yml.enc` file:

```shell
$ connect

(appserver) $ VISUAL=vi rails credentials:edit
```

## CI/CD

CI/CD is done using **GitHub Actions**.

**The code is tested & deployed** each time a commit is pushed to GitHub. 

See: `.github/workflows/test-and-deploy.yml`.

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
$ connect

# run smoke tests against staging env
(appserver) $ SMOKE_TEST=true rails test:system
```

## Testing The Production Build Locally

Run ` export RAILS_MASTER_KEY=_____` with your master key.

Temporarily set `RAILS_ENV=staging` in `./webapp/.env`.

```shell
# build
$ docker compose -f docker-compose-staging.yml build

# start services
$ docker compose -f docker-compose-staging.yml up -d

# once done
$ docker compose -f docker-compose-staging.yml down
```

After, revert to `RAILS_ENV=development` in `./webapp/.env`.
