const express = require('express');
const router = express.Router();
const devolucoesController = require('../controllers/devolucoesController');

// Rota para registrar uma devolução
router.post('/', devolucoesController.registrarDevolucao);

module.exports = router;