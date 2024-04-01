#!/bin/bash -e

echo "RAILS_ENV is $RAILS_ENV"

if [ "${1}" == "run-react-on-rails-in-dev-mode" ]; then
    # kick off system tests to prevent first time use from taking so long
    ./bin/rails test:system > /tmp/rails-test:system.out 2>&1 &

    ./bin/dev
elif [ "${1}" == "run-sleep-command" ]; then
    exec sh -c 'while :; do sleep .5; done'
else
    exec "${@}"
fi
