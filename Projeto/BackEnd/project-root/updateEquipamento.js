const sequelize = require('./database');
const Equipamento = require('./models/equipamento');

(async () => {
    try {
        await sequelize.sync();
        await Equipamento.update({ tipo: 'desconhecido' }, { where: { tipo: null } });
        console.log('Coluna "tipo" atualizada com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar a coluna "tipo":', error);
    } finally {
        await sequelize.close();
    }
})();