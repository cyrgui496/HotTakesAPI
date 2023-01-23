const express = require("express") // standard framework for server development in Node.js
const router = express.Router() // to create modular, mountable route handlers with midlleware express.router

//inclusion of middleware
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const isOwner = require('../middleware/is-owner')

// inclusion of sauce controller
const sauceCtrl = require('../controllers/sauce')

// CRUD operation
router.post('/sauces', auth, multer, sauceCtrl.createSauce)
router.get('/sauces', auth, sauceCtrl.getAllSauces)
router.get('/sauces/:id', auth, sauceCtrl.getOneSauce)
router.put('/sauces/:id', auth, isOwner, multer, sauceCtrl.modifySauce)
router.delete('/sauces/:id', auth, isOwner, sauceCtrl.deleteSauce)
router.post('/sauces/:id/like', auth, sauceCtrl.likeSauce)

// We export const router
module.exports = router