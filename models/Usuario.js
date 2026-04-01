const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tablero = sequelize.define('Tablero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'tableros',
  timestamps: true
});

module.exports = Tablero;