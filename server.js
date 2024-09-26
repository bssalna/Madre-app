const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('code')); // Para servir archivos estáticos desde la carpeta 'code'

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto según tu configuración
    password: 'Contraseña123!', // Cambia esto según tu configuración
    database: 'madre_db'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});


// Manejar inicio de sesión
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
    
    db.query(query, [usuario, contraseña], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.send('Credenciales incorrectas');
        }
    });
});

// Ruta para obtener perfiles
app.get('/api/perfiles', (req, res) => {
    const sql = 'SELECT * FROM Perfiles';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Ruta para obtener tareas
app.get('/api/tareas', (req, res) => {
    db.query('SELECT * FROM Tareas', (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);
    });
});

// Ruta para guardar selección de tareas
app.post('/api/guardar-seleccion', (req, res) => {
    const tareasSeleccionadas = req.body;
    console.log('Tareas seleccionadas:', tareasSeleccionadas);
    res.status(200).send('Selección guardada');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
