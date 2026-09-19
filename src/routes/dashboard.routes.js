const express = require('express');
const router = express.Router();
const bffController = require('../controllers/bff.controller');

router.post('/login', bffController.login);
router.get('/dashboard/:userId', bffController.getDashboardData);
router.post('/transferencias', bffController.hacerTransferencia);

module.exports = router;