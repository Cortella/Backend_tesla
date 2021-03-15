const express = require('express')
const router = express.Router()

//Carrega controller
const controller = require('../controllers/product-controller')

router.get('/', controller.get)
router.get('/:slug', controller.getBySlug)
router.get('/tags/:tag', controller.getByTag)
router.post('/',controller.post)
router.put('/:id',controller.put)
router.delete('/:id',controller.delete)

module.exports = router