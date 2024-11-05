const { Equipamento } = require('../models/equipamento');

exports.cadastrarEquipamento = async (req, res) => {
    const { tamanho, codigo_produto, status,tipo } = req.body;
    try {
        const novoEquipamento = await Equipamento.create({
            tamanho,
            codigo_produto,
            status,
            tipo
        });
        res.status(201).json(novoEquipamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};