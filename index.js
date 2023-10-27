const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; 

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

app.use(cors());
app.use(bodyParser.json());

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

app.post('/api/posts', (req, res) => {
    const noteObj = req.body; 
  
    const queryInsert = 'INSERT INTO notes_table (note, note_done) VALUES (?, ?)';
  
    db.query(queryInsert, [noteObj.note, noteObj.noteDone], (err, resultado) => {
      if (err) {
        console.error('Error al crear la nota:', err);
        res.status(500).json({ error: 'Error al crear la nota' });
        return;
      }
      console.log('Nota creada:', resultado.insertId);
      res.status(201).json({ id: resultado.insertId, message: 'NNota creada con éxito' });
    });
  });
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});