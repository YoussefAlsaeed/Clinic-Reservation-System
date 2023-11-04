const userService = require('../services/UserService.js')


const router = require('express').Router()


router.post('/signup', async (req, res) => {
    const { email, password, type, name } = req.body;
  
    try {
      const user = await userService.signupUser(email, password, type, name);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'User registration failed', message: error.message });
    }
  });
module.exports = router