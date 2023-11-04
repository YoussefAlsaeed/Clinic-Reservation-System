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
    const userType = user.type; // Assuming "type" is a field in the User table

    // You can return the user type in the response if needed
    res.status(200).json({ message: 'User signed in successfully', userType });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during sign-in.");
  }
};


module.exports = {
 
  signUp,
  signIn
};