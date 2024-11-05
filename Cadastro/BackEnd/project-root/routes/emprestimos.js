const express = require('express');
const router = express.Router();
const { registrarEmprestimo } = require('../controllers/emprestimosController');

router.post('/', registrarEmprestimo);

module.exports = router;