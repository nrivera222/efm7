const { sequelize, Tablero, Lista, Tarjeta } = require('../models');

async function testCRUD() {
  try {
    console.log('🚀 Iniciando pruebas CRUD...\n');

    // CREATE
    const nuevaTarjeta = await Tarjeta.create({
      titulo: "Nueva tarea de prueba",
      descripcion: "Creada desde test-crud.js",
      lista_id: 1,
      etiquetas: ["test"]
    });
    console.log('✅ CREATE: Tarjeta creada con ID:', nuevaTarjeta.id);

    // READ con relaciones
    const tablero = await Tablero.findByPk(1, {
      include: [
        { model: Lista, as: 'listas', include: [{ model: Tarjeta, as: 'tarjetas' }] }
      ]
    });

    console.log(`\n✅ READ: Tablero "${tablero.titulo}" con ${tablero.listas.length} listas`);

    // UPDATE
    await Tarjeta.update(
      { titulo: "Tarea actualizada - IMPORTANTE" },
      { where: { id: nuevaTarjeta.id } }
    );
    console.log('✅ UPDATE: Tarjeta actualizada');

    // DELETE
    await Tarjeta.destroy({ where: { id: nuevaTarjeta.id } });
    console.log('✅ DELETE: Tarjeta eliminada');

    console.log('\n🎉 Todas las pruebas CRUD completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en pruebas CRUD:', error.message);
  } finally {
    await sequelize.close();
  }
}

testCRUD();