const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/controller')

router.get('/',controller.getIndex)
router.get('/cards', controller.getCards)
router.get('/paginacadastro', controller.getPaginaCad)
router.get('/paginalogin', controller.getPaginaLog)
router.post('/login', controller.postLog)
router.post('/cadastro', controller.postCad)


module.exports = router;