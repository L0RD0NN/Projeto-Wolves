const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Equipamento extends Model {}

Equipamento.init({
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_produto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'disponivel'
    }
}, {
    sequelize,
    modelName: 'Equipamento',
    tableName: 'equipamentos', 
    freezeTableName: true, 
    timestamps: true 
});

module.exports = Equipamento;