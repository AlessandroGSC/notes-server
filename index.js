const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Puedes cambiar el puerto si es necesario

// Configuración de MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'notes',
  port: 33060
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes_table', (err, result) => {
    if (err) {
      console.error('Error en la consulta MySQL:', err);
      res.status(500).send('Error en el servidor');
    } else {
      res.json(result);
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});