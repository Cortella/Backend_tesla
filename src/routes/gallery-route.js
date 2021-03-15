const express = require('express')
const router = express.Router()

//Carrega controller
const controller = require('../controllers/gallery-controller')

router.get('/', controller.get)
router.get('/:id', controller.getById)
router.get('/year/:year', controller.getByYear)
router.post('/',controller.post)
router.put('/:id',controller.put)
router.delete('/:id',controller.delete)

module.exports = router