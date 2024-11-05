const sequelize = require('./database');
const { DataTypes } = require('sequelize');

(async () => {
    try {
        const queryInterface = sequelize.getQueryInterface();
        await queryInterface.addColumn('equipamentos', 'tipo', {
            type: DataTypes.STRING,
            allowNull: true
        });
        console.log('Coluna "tipo" adicionada com sucesso.');
    } catch (error) {
        console.error('Erro ao adicionar a coluna "tipo":', error);
    } finally {
        await sequelize.close();
    }
})();