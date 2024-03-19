#!/bin/bash -e

echo "RAILS_ENV is $RAILS_ENV"

# If running the rails server then create or migrate existing database
if [ "${1}" == "./bin/rails" ] && [ "${2}" == "server" ]; then
    # echo "running \"rails db:version || rails db:create\" BEFORE db:prepare"
    # ./bin/rails db:version || ./bin/rails db:create
    # ./bin/rails db:prepare
    # echo "running \"rails db:version\" AFTER db:prepare"
    # ./bin/rails db:version

    echo "running drop, create, migrate"
    DISABLE_DATABASE_ENVIRONMENT_CHECK=1 ./bin/rails db:drop
    DISABLE_DATABASE_ENVIRONMENT_CHECK=1 ./bin/rails db:create
    DISABLE_DATABASE_ENVIRONMENT_CHECK=1 ./bin/rails db:migrate
fi

# Dropbear SSH server - never ended up needing
# sudo /start-sshd.sh

exec "${@}"
