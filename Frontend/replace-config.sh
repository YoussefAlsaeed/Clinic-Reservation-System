#!/bin/sh

sed -i "s|default|$API_URL|g" /app/src/config.json
