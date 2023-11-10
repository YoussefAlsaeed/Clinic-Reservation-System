const doctorService = require('../services/DoctorService.js')


const router = require('express').Router()

router.post('/createSlot', doctorService.createSlot )
router.get('/getSlotsForDoctor/:doctorID', doctorService.getSlotsForDoctor)


module.exports = router  