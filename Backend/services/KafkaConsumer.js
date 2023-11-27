const { Kafka } = require('kafkajs');
const db = require('../models')
const Event = db.event
const Doctor = db.doctor


const kafka = new Kafka({
  clientId: 'reservation',
  brokers: ['kafka-cntr:9092'],
});

let consumer;

const getConsumer = () => {
  if (!consumer) {
    consumer = kafka.consumer({ groupId: 'doctor-group' });
  }
  return consumer;
};

const consumeEvents = async () => {
  const consumer = getConsumer();

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'clinic_reservation' });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const reservationEvent = JSON.parse(message.value.toString());

          const doctor = await Doctor.findByPk(reservationEvent.doctorID);

          // Check if the doctor exists before associating the event
          if (doctor) {
            // Create the event and associate it with the doctor
            await doctor.createEvent(reservationEvent);
          } else {
            console.log(`Doctor ${reservationEvent.doctorId} not found for the event.`);
          }
          // Log the received message
          console.log('Received message:', reservationEvent);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  } catch (error) {
    console.error('Error connecting to Kafka:', error);
  }
};

consumeEvents().catch((err) => console.error('Consumer error:', err));

module.exports = consumeEvents;
