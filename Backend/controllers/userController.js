const userService = require('../services/UserService.js')


const router = require('express').Router()

router.post('/signUp',userService.signUp)
router.post('/signIn',userService.signIn)

module.exports = router