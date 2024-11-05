const express = require('express');
const router = express.Router();
const { cadastrarUsuario, loginUsuario } = require('../controllers/authController');
const { Usuario } = require('../models/usuario');

router.post('/register', cadastrarUsuario);
router.post('/login', loginUsuario);

// Rota para listar todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

module.exports = router;