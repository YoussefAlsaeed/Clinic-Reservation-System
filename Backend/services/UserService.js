const db = require('../models')

const User = db.user
const Doctor = db.doctor
const Patient = db.patient

const signUp = async (req, res) => {
  try {
    const { email, password, name, type } = req.body;

    if (type !== 'doctor' && type !== 'patient') {
      return res.status(400).json({ error: "Invalid user type: " + type });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const user = await User.create({ email, password, type });

    if (type === 'doctor') {
      await Doctor.create({ email, name });
    } else {
      await Patient.create({ email, name });
    }

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User registration failed." });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const userType = user.type;
    let username = '';
    let ID = null;

    if (userType === 'doctor') {
      const doctor = await Doctor.findOne({ where: { email: user.email } });
      if (doctor) {
        ID = doctor.doctorID;
        username = doctor.name;
      }
    } else if (userType === 'patient') {
      const patient = await Patient.findOne({ where: { email: user.email } });
      if (patient) {
        ID = patient.patientID;
        username = patient.name;
      }
    }

    res.status(200).json({ name: username, type: userType, ID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during sign-in." });
  }
};


module.exports = { 
  signUp,
  signIn
};