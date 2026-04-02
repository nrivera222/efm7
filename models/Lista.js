const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lista = sequelize.define('Lista', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  posicion: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'listas',
  timestamps: true
});

module.exports = Lista;