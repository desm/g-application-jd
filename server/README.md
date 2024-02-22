### Installation

Install [autoenv](https://github.com/hyperupcall/autoenv)

### Run Services: RoR, MySQL, Adminer

```shell
# Start services
$ up    ;# <--------- "up" is defined in .autoenv
```

These should work:

- http://localhost:8000/ - default Ruby on Rails page
- http://localhost:8000/hello_world - example React on Rails page
- http://localhost:8001/?server=db&username=root&db=appserver_development&select=users - Adminer point to MySQL database
- http://localhost:8000/signup - Gumroad signup page
- http://localhost:8000/dashboard - Gumroad dashboard page

### Running rails CLI

```shell
$ connect    ;# <--------- opens a shell in the "appserver" container

(appserver) $ rails --help
```

### Adding Gems

```shell
(appserver) $ bundle add {gem} --skip-install

(appserver) $ exit

$ docker-compose down

$ up  ;# <------ rebuilds appserver image, updates local Gemfile & Gemfile.lock, and starts services
```
