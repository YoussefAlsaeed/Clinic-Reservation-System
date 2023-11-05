const db = require('../models')

const User = db.user
const Doctor = db.doctor
const Slot = db.slot

const createSlot = async (req, res) => {
  try {
    // Extract the slot information from the request body
    const slotInfo = {
      isAvailable: req.body.isAvailable,
      time: req.body.time,
    };

    // Get the doctorID from the request or another source (e.g., authentication)
    const doctorID = req.body.doctorID;

    // Check if a slot with the same time already exists
    const existingSlot = await Slot.findOne({ where: { time: slotInfo.time, doctorID } });

    if (existingSlot) {
      res.status(400).send("A slot with this time already exists.");
      return;
    }

    // Check if the doctor with the given ID exists
    const doctor = await Doctor.findByPk(doctorID);
    if (!doctor) {
      res.status(404).send("Doctor not found.");
      return;
    }

    // If all checks are passed, create the slot and associate it with the doctor
    const slot = await Slot.create(slotInfo);
    await doctor.addSlot(slot);

    res.status(200).send("Slot has been successfully reserved");
    console.log(slot);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the slot.");
  }
};

module.exports = {
    createSlot
}