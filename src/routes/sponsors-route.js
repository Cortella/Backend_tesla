const express = require('express')
const router = express.Router()

//Carrega controller
const controller = require('../controllers/sponsors-controller')

router.get('/',controller.get)
router.get('/:id',controller.getById,)
//router.get('/:admin',controller.getForAdmin)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/:id', controller.delete)

module.exports = router