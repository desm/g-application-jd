## Development

### Installation

Install [autoenv](https://github.com/hyperupcall/autoenv)

### Start Services

This will start 3 Docker containers: Ruby on Rails, MySQL, and Adminer, which is a DB management tool.

```shell
# "up" is defined in .autoenv
$ up
```

Once the containers are running, these links should work:

- http://localhost:8000/ - Ruby on Rails app
- http://localhost:8000/hello_world - Example React on Rails page
- http://localhost:8001/?server=db&username=root&db=appserver_development&select=users - Adminer point to MySQL database, user: root, pass: abc
- http://localhost:8000/signup - Gumroad signup page
- http://localhost:8000/dashboard - Gumroad dashboard page

### Running rails CLI

```shell
# "connect" is defined in .autoenv, it opens a shell in the "appserver" container
$ connect

(appserver) $ rails --help
```

### Adding Gems

```shell
# Add the gem from within the container, but update Gemfile only
(appserver) $ bundle add {gem} --skip-install

(appserver) $ exit

# Bring all running containers down
$ docker-compose down

# Run "up" again
$ up
```

Running "up" will rebuild the appserver Docker image so that the new Gem is installed in it. For more details, see the "up" alias defined in `.autoenv`.

### Running Tests

```shell
(appserver) $ rails test; # runs tests in the 'test' dir (except for 'test/system'): unit, functional, integration
(appserver) $ rails test:system; # runs tests under 'test/system': headless browser tests
(appserver) $ jest; # runs tests under '__tests__' dir: frontend unit tests
```

Note: running 'jest' does not do type-checking. To do type-checking, run `bin/shakapacker` (see next section).

### Building For Production

```shell
(appserver) $ RAILS_ENV=production NODE_ENV=production bin/shakapacker
```

## Documentation

- [Minitest](http://docs.seattlerb.org/minitest/)
- [React on Rails](https://www.shakacode.com/react-on-rails/docs/)
- [React](https://react.dev/)
- [React Testing Library \_ Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Capybara](https://rubydoc.info/github/teamcapybara/capybara/master)

