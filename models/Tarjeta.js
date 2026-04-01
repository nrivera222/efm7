const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarjeta = sequelize.define('Tarjeta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  posicion: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  etiquetas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  tableName: 'tarjetas',
  timestamps: true
});

module.exports = Tarjeta;