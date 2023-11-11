const db = require('../models')
const Doctor = db.doctor
const Slot = db.slot;
const Patient = db.patient
const Appointment = db.appointment
const produceEvent = require('./KafkaProducer')

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ['doctorID', 'name'],
      include: {
        model: Slot,
        attributes: ['slotID', 'time'],
        where: { isAvailable: true }, // Filter available slots
      },
    });

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching doctor information." });
  }
};


const makeAppointment = async (req, res) => {
  try {
    // Extract patient and slot IDs from the request body
    const { patientID, slotID } = req.body;

    // Check if the patient exists
    const patient = await Patient.findByPk(patientID);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Check if the slot exists
    const slot = await Slot.findByPk(slotID, { include: Doctor });
    if (!slot) {
      return res.status(404).json({ error: "Slot not found." });
    }

    // Check if the slot is available
    if (!slot.isAvailable) {
      return res.status(400).json({ error: "The slot is not available." });
    }

    // Create a new appointment and associate it with the patient and slot
    const appointment = await Appointment.create();
    await patient.addAppointment(appointment);
    await appointment.setSlot(slot);

    // Update the slot to mark it as unavailable
    await slot.update({ isAvailable: false });

    // Retrieve the doctorId from the associated Doctor instance
    const doctorId = slot.doctorID;

    // Create a Kafka reservation event
    const reservationEvent = {
      doctorID: doctorId,
      patientId: patientID,
      operation: 'Reservation Created',
    };

    // Send the Kafka reservation event
    await produceEvent(reservationEvent);

    // Respond with a success message
    res.status(200).json({ message: "Appointment has been successfully created." });
  } catch (error) {
    // Handle and log errors
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the appointment." });
  }
};


const viewReservations = async (req, res) => {
  try {
    const patientID = req.params.patientID;

    const patient = await Patient.findByPk(patientID);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    const appointments = await Appointment.findAll({
      where: { patientID },
      include: [
        {
          model: Slot,
          attributes: ['slotID', 'time'],
          include: {
            model: Doctor,
            attributes: ['name'],
          },
        },
      ],
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching patient's appointments." });
  }
};


const cancelAppointment = async (req, res) => {
  try {
    const { appointmentID } = req.params;

    const appointment = await Appointment.findByPk(appointmentID, {
      include: [
        {
          model: Slot,
          include: Doctor,
        },
        {
          model: Patient,
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    const { Doctor: doctor, patientID } = appointment.Slot;
    const doctorID = doctor.doctorID;
    const patientId = appointment.patientID;

    await appointment.Slot.update({ isAvailable: true });
    await appointment.destroy();

    const reservationEvent = {
      doctorID: doctorID,
      patientId: patientId,
      operation: 'Reservation Cancelled',
    };

    await produceEvent(reservationEvent);

    res.status(200).json({ message: "Appointment has been successfully cancelled." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while canceling the appointment." });
  }
};

  

const updateAppointmentDoctor = async (req, res) => {
  try {
    const { appointmentID, newDoctorID } = req.body;

    const appointment = await Appointment.findByPk(appointmentID, {
      include: [
        {
          model: Slot,
          include: Doctor,
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    const newDoctor = await Doctor.findByPk(newDoctorID);
    if (!newDoctor) {
      return res.status(404).json({ error: "New doctor not found." });
    }

    await appointment.Slot.setDoctor(newDoctor);

    const reservationEvent = {
      doctorID: newDoctorID,
      patientId: appointment.patientID,
      operation: 'Reservation Updated',
    };

    await produceEvent(reservationEvent);

    res.status(200).json({ message: "Doctor for the appointment has been successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the doctor for the appointment." });
  }
};


const updateAppointmentSlot = async (req, res) => {
  try {
    const { appointmentID, newSlotID } = req.body;

    const appointment = await Appointment.findByPk(appointmentID);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    const newSlot = await Slot.findByPk(newSlotID);

    if (!newSlot) {
      return res.status(404).json({ error: "New slot not found." });
    }

    if (!newSlot.isAvailable) {
      return res.status(400).json({ error: "New slot is not available." });
    }

    const previousSlot = await Slot.findByPk(appointment.slotID);
    if (previousSlot) {
      previousSlot.isAvailable = true;
      await previousSlot.save();
    }

    appointment.slotID = newSlotID;
    await appointment.save();

    newSlot.isAvailable = false;
    await newSlot.save();

    const reservationEvent = {
      doctorID: newSlot.doctorID,
      patientId: appointment.patientID,
      operation: 'Reservation Updated',
    };

    await produceEvent(reservationEvent);

    res.status(200).json({ message: "Appointment slot has been updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the appointment." });
  }
};

  
  module.exports = {
    getDoctors,
    makeAppointment,
    viewReservations,
    cancelAppointment,
    updateAppointmentDoctor,
    updateAppointmentSlot
   
}