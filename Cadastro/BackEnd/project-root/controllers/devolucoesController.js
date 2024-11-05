const Emprestimo = require('../models/emprestimo');
const Equipamento = require('../models/equipamento');
const Devolucao = require('../models/devolucao'); 

exports.registrarDevolucao = async (req, res) => {
    const { codigo_produto, estado_equipamento } = req.body;
    try {
        // Verificar se o empréstimo existe e está ativo (não devolvido)
        const emprestimo = await Emprestimo.findOne({ where: { codigo_produto, status: 'Não devolvido' } });
        if (!emprestimo) {
            return res.status(400).json({ error: 'Empréstimo não encontrado ou já devolvido' });
        }

        // Atualizar a data de devolução do empréstimo e o status
        const dataDevolucaoReal = new Date();
        emprestimo.dataDevolucao = dataDevolucaoReal;
        emprestimo.status = 'Devolvido';
        await emprestimo.save();

        // Atualizar o status do equipamento para 'disponivel'
        const equipamento = await Equipamento.findOne({ where: { codigo_produto } });
        equipamento.status = 'Disponível';
        await equipamento.save();

        // Calcular a diferença entre a data de devolução prometida e a data de devolução real
        const dataDevolucaoPrometida = new Date(emprestimo.dataDevolucaoPrometida);
        const diffTime = dataDevolucaoReal - dataDevolucaoPrometida;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converter a diferença de tempo em dias

        let message = 'Devolução registrada com sucesso';
        if (diffDays > 0) {
            message += `. O usuário atrasou a devolução em ${diffDays} dias.`;
        } else if (diffDays < 0) {
            message += `. O usuário devolveu o equipamento ${Math.abs(diffDays)} dias antes do prazo.`;
        } else {
            message += `. O usuário devolveu o equipamento no prazo.`;
        }

        // Registrar a devolução na tabela Devolucoes
        await Devolucao.create({
            nome_usuario: emprestimo.nome_usuario,
            codigo_produto: codigo_produto,
            telefone: emprestimo.telefone,
            dataDevolucaoReal: dataDevolucaoReal,
            dataDevolucaoPrometida: dataDevolucaoPrometida,
            diasAtraso: diffDays,
            status: emprestimo.status,
            estado_equipamento: estado_equipamento
        });

        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};