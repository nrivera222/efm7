const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3000;

// ======================== CONFIGURACIÓN ========================

// Pool de conexión a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 5432,
});

// Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ======================== RUTAS ========================

// Home
app.get('/', (req, res) => {
  res.render('home');
});

// Registro
app.get('/register', (req, res) => {
  res.render('register');
});

// Login
app.get('/login', (req, res) => {
  res.render('login');
});

// Dashboard
app.get('/dashboard', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data.json');
    
    if (!fs.existsSync(dataPath)) {
      return res.send('<h2>Error: No se encuentra data.json</h2><p>Crea el archivo data.json en la raíz del proyecto.</p>');
    }

    const data = fs.readFileSync(dataPath, 'utf8');
    const kanbanData = JSON.parse(data);
    
    res.render('dashboard', { tableros: kanbanData.tableros });
  } catch (error) {
    console.error('Error al leer data.json:', error);
    res.send(`
      <h2>Error al leer los datos</h2>
      <p>${error.message}</p>
      <a href="/">Volver al Inicio</a>
    `);
  }
});

// Nueva Tarjeta
app.post('/nueva-tarjeta', (req, res) => {
  const { listaId, titulo, descripcion } = req.body;

  try {
    const dataPath = path.join(__dirname, 'data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const kanbanData = JSON.parse(data);

    kanbanData.tableros.forEach(tablero => {
      tablero.listas.forEach(lista => {
        if (lista.id == listaId) {
          const nuevaTarjeta = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion || ''
          };
          lista.tarjetas.push(nuevaTarjeta);
        }
      });
    });

    fs.writeFileSync(dataPath, JSON.stringify(kanbanData, null, 2));
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.send('Error al guardar la tarjeta');
  }
});

// Estado de la Base de Datos
app.get('/db-status', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const versionResult = await client.query('SELECT version()');
    const version = versionResult.rows[0].version.split(' on ')[0];

    res.render('db-status', {
      success: true,
      user: process.env.DB_USER || 'No definido',
      host: process.env.DB_HOST || 'No definido',
      database: process.env.DB_NAME || 'No definido',
      port: process.env.DB_PORT || 5432,
      version: version
    });
  } catch (err) {
    res.render('db-status', {
      success: false,
      error: err.message
    });
  } finally {
    if (client) client.release();
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔗 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`🔌 Estado BD: http://localhost:${PORT}/db-status`);
});