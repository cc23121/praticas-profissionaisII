const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/controller')
router.get('/getFilmes',controller.getFilmes)
router.post('/postusuario',controller.postUsuario)
router.put('/putusuarios',controller.putUsuarios)


module.exports = router; // Exporta o roteador
