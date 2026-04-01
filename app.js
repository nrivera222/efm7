// === ASOCIACIONES (al final de app.js o en un archivo separado) ===
const Usuario = require('./models/Usuario');
const Tablero = require('./models/Tablero');
const Lista = require('./models/Lista');
const Tarjeta = require('./models/Tarjeta');

// Relaciones
Usuario.hasMany(Tablero, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Tablero.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Tablero.hasMany(Lista, { foreignKey: 'tableroId', onDelete: 'CASCADE' });
Lista.belongsTo(Tablero, { foreignKey: 'tableroId' });

Lista.hasMany(Tarjeta, { foreignKey: 'listaId', onDelete: 'CASCADE' });
Tarjeta.belongsTo(Lista, { foreignKey: 'listaId' });

console.log('✅ Relaciones de modelos configuradas correctamente');