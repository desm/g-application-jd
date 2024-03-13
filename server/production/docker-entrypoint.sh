#!/bin/bash -e

# If running the rails server then create or migrate existing database
if [ "${1}" == "./bin/rails" ] && [ "${2}" == "server" ]; then
    echo "RAILS_ENV is $RAILS_ENV"
    echo "running \"rails db:version || rails db:create\" BEFORE db:prepare"
    ./bin/rails db:version || ./bin/rails db:create
    ./bin/rails db:prepare
    echo "running \"rails db:version\" AFTER db:prepare"
    ./bin/rails db:version
fi

sudo /start-sshd.sh

exec "${@}"
