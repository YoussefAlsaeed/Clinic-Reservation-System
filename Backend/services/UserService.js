const db = require('../models')

const User = db.user
const Doctor = db.doctor
const Patient = db.patient

async function signupUser(email, password, type, name = null) {
  try {
    // Create a new user
    const user = await User.create({ email, password, type });
    
    if (type === 'doctor') {
      // Create a doctor record
      await Doctor.create({ email, name });
    } else if (type === 'patient') {
      // Create a patient record
      await Patient.create({ email, name });
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signupUser,
};
