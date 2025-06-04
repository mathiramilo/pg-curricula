#!/bin/sh
envsubst '$API_URL $API_KEY' \
  < /usr/share/nginx/html/env-config.js.template \
  > /usr/share/nginx/html/env-config.js

exec "$@"
