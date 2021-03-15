const express = require('express')
const router = express.Router()

//Carrega controller
const controller = require('../controllers/order-controller')

router.get('/',controller.get)
router.post('/',controller.post)

module.exports = router