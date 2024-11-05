const express = require('express');
const router = express.Router();
const Equipamento = require('../models/equipamento');

// Rota para criar um novo equipamento
router.post('/', async (req, res) => {
    const { tamanho, codigo_produto, tipo, status } = req.body;
    try {
        const novoEquipamento = await Equipamento.create({
            tamanho,
            codigo_produto,
            tipo,
            status
        });
        res.status(201).json(novoEquipamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;