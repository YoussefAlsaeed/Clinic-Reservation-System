const doctorService = require('../services/DoctorService.js')
const userService = require('../services/UserService.js')


const router = require('express').Router()


/**
 * @swagger
 * /registerDoctor:
 *   post:
 *     summary: Register a new doctor
 *     description: Register a new doctor in the system.
 *     tags:
 *       - Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Doctor registered successfully
 *       400:
 *         description: Bad request
 */

router.post('/registerDoctor', doctorService.registerDoctor )

