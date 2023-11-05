const db = require('../models')

const User = db.user
const Doctor = db.doctor
const Patient = db.patient

const signUp = async (req, res) => {
  try {
    const { email, password, name, type } = req.body;

    // Check if the provided type is valid (either "doctor" or "patient")
    if (type !== 'doctor' && type !== 'patient') {
      return res.status(400).send("Invalid user type.");
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).send("Email already in use.");
    }

    // Create a new user
    const user = await User.create({ email, password, type });

    if (type === 'doctor') {
      // Create a doctor record
      await Doctor.create({ email, name });
    } else {
      // Create a patient record
      await Patient.create({ email, name });
    }

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).send("User registration failed.");
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      return res.status(401).send("Invalid password.");
    }

    // Determine the user type (doctor or patient)
    const userType = user.type;

    // Initialize the ID variable
    let ID = null;

    if (userType === 'DOCTOR') {
      // If the user is a doctor, find the associated doctor record
      const doctor = await Doctor.findOne({ where: { email: user.email } });
      if (doctor) {
        ID = doctor.doctorID;
      }
    } else if (userType === 'PATIENT') {
      // If the user is a patient, find the associated patient record
      const patient = await Patient.findOne({ where: { email: user.email } });
      if (patient) {
        ID = patient.patientID;
      }
    }

    // Return the user's email, type, and the relevant ID (either doctor or patient)
    res.status(200).json({ email: user.email, type: userType, ID });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during sign-in.");
  }
};



module.exports = { 
  signUp,
  signIn
};