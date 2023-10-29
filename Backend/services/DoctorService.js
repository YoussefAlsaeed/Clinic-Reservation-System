const db = require('../models')

const Doctor = db.doctor

const registerDoctor = async (req,res) => {
    let info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const doctor = await Doctor.create(info)
    res.status(200).send(doctor)
    console.log(doctor)
}

module.exports = {
    registerDoctor
}