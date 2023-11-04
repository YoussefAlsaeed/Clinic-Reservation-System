const doctorService = require('../services/DoctorService.js')


const router = require('express').Router()

router.post('/createSlot', doctorService.createSlot )



module.exports = router