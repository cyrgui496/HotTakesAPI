const express = require('express') // standard framework for server development in Node.js
const router = express.Router() // to create modular, mountable route handlers with midlleware express.router

// inclusion of user controller
const userCtrl = require('../controllers/user')

// CRUD operation
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

// We export const router
module.exports = router