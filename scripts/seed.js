const { sequelize, Usuario, Tablero, Lista, Tarjeta } = require('../models');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // ¡Cuidado! Borra todo en desarrollo
    console.log('Base de datos sincronizada.');

    // Crear usuarios
    const usuario1 = await Usuario.create({
      nombre: "Noemy Rivera",
      email: "noemy.rivera@example.com",
      password_hash: "$2b$10$demo_hash" // En producción usar bcrypt
    });

    const usuario2 = await Usuario.create({
      nombre: "Carlos López",
      email: "carlos.lopez@example.com",
      password_hash: "$2b$10$demo_hash"
    });

    // Crear tableros
    const tablero1 = await Tablero.create({
      titulo: "Proyecto KanbanPro",
      descripcion: "Desarrollo del tablero Kanban",
      usuario_id: usuario1.id
    });

    const tablero2 = await Tablero.create({
      titulo: "Marketing 2026",
      descripcion: "Campañas de marketing",
      usuario_id: usuario1.id
    });

    // Crear listas
    const lista1 = await Lista.create({ titulo: "Por hacer", tablero_id: tablero1.id, posicion: 1 });
    const lista2 = await Lista.create({ titulo: "En progreso", tablero_id: tablero1.id, posicion: 2 });
    const lista3 = await Lista.create({ titulo: "Hecho", tablero_id: tablero1.id, posicion: 3 });

    // Crear tarjetas
    await Tarjeta.create({
      titulo: "Diseñar modelo de datos",
      descripcion: "Crear modelos con Sequelize",
      lista_id: lista1.id,
      etiquetas: ["backend", "database"]
    });

    await Tarjeta.create({
      titulo: "Implementar autenticación",
      descripcion: "JWT + bcrypt",
      lista_id: lista2.id,
      etiquetas: ["auth"]
    });

    console.log('✅ Datos de prueba insertados correctamente!');
  } catch (error) {
    console.error('❌ Error en el seed:', error);
  } finally {
    await sequelize.close();
  }
}

seed();