const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Tablero = require('./Tablero');
const Lista = require('./Lista');
const Tarjeta = require('./Tarjeta');

// Definir relaciones
Usuario.hasMany(Tablero, { foreignKey: 'usuario_id', as: 'tableros' });
Tablero.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

Tablero.hasMany(Lista, { foreignKey: 'tablero_id', as: 'listas' });
Lista.belongsTo(Tablero, { foreignKey: 'tablero_id', as: 'tablero' });

Lista.hasMany(Tarjeta, { foreignKey: 'lista_id', as: 'tarjetas' });
Tarjeta.belongsTo(Lista, { foreignKey: 'lista_id', as: 'lista' });

module.exports = {
  sequelize,
  Usuario,
  Tablero,
  Lista,
  Tarjeta
};