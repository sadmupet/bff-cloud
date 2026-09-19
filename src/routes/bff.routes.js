const express = require('express');
const router = express.Router();
const bffController = require('../controllers/bff.controller');

router.post('/login', bffController.login);
router.get('/dashboard/:userId', bffController.getDashboardData);
router.post('/transferencias', bffController.hacerTransferencia);
router.post('/register', bffController.register);
router.get('/dashboard/:id', bffController.getDashboardData);
router.get('/usuarios/buscar', bffController.buscarUsuario);
router.post('/contactos', bffController.crearContacto);

module.exports = router;