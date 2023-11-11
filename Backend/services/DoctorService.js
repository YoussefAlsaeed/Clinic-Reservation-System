const db = require('../models')

const consumeEvents = require('./KafkaConsumer')

const User = db.user
const Doctor = db.doctor
const Slot = db.slot

const createSlot = async (req, res) => {
  try {
    // Extract the slot information from the request body
    const slotInfo = {
      isAvailable: true,
      time: req.body.time,
    };

    const doctorID = req.body.doctorID;

    // Check if a slot with the same time already exists
    const existingSlot = await Slot.findOne({ where: { time: slotInfo.time, doctorID } });

    if (existingSlot) {
      res.status(400).json({ error: "A slot with this time already exists." });
      return;
    }

    // Check if the doctor with the given ID exists
    const doctor = await Doctor.findByPk(doctorID);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found." });
      return;
    }

    // If all checks are passed, create the slot and associate it with the doctor
    const slot = await Slot.create(slotInfo);
    await doctor.addSlot(slot);

    res.status(200).json({ message: "Slot has been successfully reserved", slot });
    console.log(slot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the slot." });
  }
};

const getSlotsForDoctor = async (req, res) => {
  try {
    // Get the doctorID from the request parameters
    const doctorID = req.params.doctorID;

    // Check if the doctor with the given ID exists
    const doctor = await Doctor.findByPk(doctorID);

    if (!doctor) {
      res.status(404).json({ error: "Doctor not found." });
      return;
    }

    //Get slots for the specified doctor
    const slots = await doctor.getSlots();

    // Return the slots in the response
    res.status(200).json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the slots." });
  }
};

const getEventsForDoctor = async (req, res) => {
  try {
    const doctorID = req.params.doctorID;

    const doctor = await Doctor.findByPk(doctorID);

    if (!doctor) {
      res.status(404).json({ error: "Doctor not found." });
      return;
    }

    const events = await doctor.getEvents(); 

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the events." });
  }
};


module.exports = {
    createSlot,
    getSlotsForDoctor,
    getEventsForDoctor
}
