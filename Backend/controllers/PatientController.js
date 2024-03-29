const patientService = require('../services/PatientService.js')


const router = require('express').Router()

router.get('/getDoctors' , patientService.getDoctors)
router.post('/makeAppointment', patientService.makeAppointment)
router.get('/viewReservation/:patientID', patientService.viewReservations)
router.put('/updateSlot',patientService.updateAppointmentSlot)
router.put('/updateDoctor',patientService.updateAppointmentDoctor)
router.delete('/cancelAppointment/:appointmentID', patientService.cancelAppointment);

module.exports = router