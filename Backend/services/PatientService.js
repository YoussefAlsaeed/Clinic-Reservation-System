const db = require('../models')
const Doctor = db.doctor
const Slot = db.slot;
const Patient = db.patient
const Appointment = db.appointment

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
      res.status(500).send("An error occurred while fetching doctor information.");
    }
  };

  const makeAppointment = async (req, res) => {
    try {
      const { patientID, slotID } = req.body;
  
      // Check if the patient exists
      const patient = await Patient.findByPk(patientID);
      if (!patient) {
        return res.status(404).send("Patient not found.");
      }
  
      // Check if the slot exists
      const slot = await Slot.findByPk(slotID);
      if (!slot) {
        return res.status(404).send("Slot not found.");
      }
  
      // Check if the slot is available
      if (!slot.isAvailable) {
        return res.status(400).send("The slot is not available.");
      }
  
      // Create a new appointment and associate it with the patient and slot
      const appointment = await Appointment.create();
      await patient.addAppointment(appointment);
      await appointment.setSlot(slot);
  
      // Update the slot to mark it as unavailable
      await slot.update({ isAvailable: false });
  
      res.status(200).send("Appointment has been successfully created.");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the appointment.");
    }
  };

  const viewReservations = async (req, res) => {
    try {
      const patientID = req.params.patientID;
  
      // Check if the patient exists
      const patient = await Patient.findByPk(patientID);
      if (!patient) {
        return res.status(404).send("Patient not found.");
      }
  
      // Fetch the patient's appointments along with slot time and doctor name
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
      res.status(500).send("An error occurred while fetching patient's appointments.");
    }
  };

  const updateAppointmentDoctor = async (req, res) => {
    try {
      const { appointmentID, newDoctorID } = req.body;
  
      // Find the appointment by appointmentID
      const appointment = await Appointment.findByPk(appointmentID);
  
      if (!appointment) {
        return res.status(404).send("Appointment not found.");
      }
  
      // Check if the newDoctorID corresponds to a valid doctor
      const newDoctor = await Doctor.findByPk(newDoctorID);
  
      if (!newDoctor) {
        return res.status(404).send("New doctor not found.");
      }
  
      // Update the appointment with the new doctor
      appointment.doctorID = newDoctorID;
      await appointment.save();
  
      res.status(200).send("Appointment doctor has been updated.");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the appointment.");
    }
  };

  const updateAppointmentSlot = async (req, res) => {
    try {
      const { appointmentID, newSlotID } = req.body;
  
      // Find the appointment by appointmentID
      const appointment = await Appointment.findByPk(appointmentID);
  
      if (!appointment) {
        return res.status(404).send("Appointment not found.");
      }
  
      // Check if the newSlotID corresponds to a valid slot
      const newSlot = await Slot.findByPk(newSlotID);
  
      if (!newSlot) {
        return res.status(404).send("New slot not found.");
      }
  
      // Mark the previous slot as available (if needed)
      const previousSlot = await Slot.findByPk(appointment.slotID);
      if (previousSlot) {
        previousSlot.isAvailable = true;
        await previousSlot.save();
      }
  
      // Update the appointment with the new slot
      appointment.slotID = newSlotID;
      await appointment.save();
  
      // Mark the new slot as unavailable
      newSlot.isAvailable = false;
      await newSlot.save();
  
      res.status(200).send("Appointment slot has been updated.");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the appointment.");
    }
  };
 
  
  module.exports = {
    getDoctors,
    makeAppointment,
    viewReservations,

    updateAppointmentDoctor,
    updateAppointmentSlot
   
}