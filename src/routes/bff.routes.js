const express = require('express');
const router = express.Router();
const bffController = require('../controllers/bff.controller');

// Dashboard y operaciones
router.get('/dashboard/:userId', bffController.getDashboardData);
router.post('/transferencias', bffController.hacerTransferencia);

// Gestión de usuarios
router.post('/register', bffController.register);
router.get('/usuarios/buscar', bffController.buscarUsuario);
router.post('/contactos', bffController.crearContacto);

module.exports = router;