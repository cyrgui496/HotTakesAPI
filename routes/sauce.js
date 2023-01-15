const express = require("express")
const router = express.Router()

const auth = require('../middleware/auth');

/*
    const sauceCtrl = require('../controllers/sauce')

    router.get('/api/sauces', auth, sauceCtrl.etc)
    router.get('/api/sauces/:id', auth, sauceCtrl.etc)
    router.post('/api/sauces', auth, sauceCtrl.etc)
    router.put('/api/sauces/:id', auth, sauceCtrl.etc)
    router.delte('/api/sauces/:id', auth, sauceCtrl.etc)
    router.post('/api/sauces/:id/like', auth, sauceCtrl.etc)
*/

module.exports = router