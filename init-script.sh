#!/bin/sh

if [ -z "$KAFKA_URL" ]; then
  echo "Error: KAFKA_URL environment variable not set."
  exit 1
fi

# blocks until kafka is reachable
kafka-topics --bootstrap-server "$KAFKA_URL" --list

echo -e 'Creating kafka topics'
kafka-topics --create --bootstrap-server "$KAFKA_URL" --topic __consumer_offsets --partitions 50 --replication-factor 1
echo -e 'Successfully created the following topics:'
kafka-topics --bootstrap-server "$KAFKA_URL" --list