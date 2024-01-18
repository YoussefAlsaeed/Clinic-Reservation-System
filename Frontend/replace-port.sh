#!/bin/sh

sed -i "s/\"port\": [0-9]*/\"port\": $ANGULAR_SERVER_PORT/" angular.json
