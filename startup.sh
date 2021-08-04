#!/bin/bash
node /usr/src/backend/index.js &

echo Starting Nginx

nginx -g 'daemon off;'