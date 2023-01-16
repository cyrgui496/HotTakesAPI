const express = require("express")
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce')

router.post('/sauces', auth, multer, sauceCtrl.createSauce)

/*
    

    router.get('/api/sauces', auth, sauceCtrl.etc)
    router.get('/api/sauces/:id', auth, sauceCtrl.etc)
    router.post('/api/sauces', auth, multer, sauceCtrl.etc)
    router.put('/api/sauces/:id', auth, multer, sauceCtrl.etc)
    router.delete('/api/sauces/:id', auth, sauceCtrl.etc)
    router.post('/api/sauces/:id/like', auth, sauceCtrl.etc)
*/

module.exports = router