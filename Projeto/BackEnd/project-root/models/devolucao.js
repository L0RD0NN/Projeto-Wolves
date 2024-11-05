const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Devolucao extends Model {}

Devolucao.init({
    nome_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataDevolucaoReal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataDevolucaoPrometida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    diasAtraso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_equipamento: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Desconhecido'
    }
}, {
    sequelize,
    modelName: 'Devolucao',
    tableName: 'Devolucaos',
    freezeTableName: true, 
    timestamps: true
});

module.exports = Devolucao;