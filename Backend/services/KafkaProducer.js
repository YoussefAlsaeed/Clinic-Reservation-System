const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'reservation',
  brokers: ['kafka-cntr:9092'],
});

const producer = kafka.producer();

const produceEvent = async (event) => {
  await producer.connect();
  await producer.send({
    topic: 'clinic_reservation',
    messages: [{ value: JSON.stringify(event) }],
  });
  await producer.disconnect();
};

module.exports = produceEvent;