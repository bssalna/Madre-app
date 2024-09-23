const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path'); // Para manejar rutas de archivos
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('code')); // Para servir archivos estáticos desde la carpeta 'code'
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Contraseña123!',
    database: 'madre_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});


// Ruta para el formulario de inicio de sesión
app.get('/iniciar_sesion', (req, res) => {
    res.sendFile(path.join(__dirname, 'code', 'iniciar_sesion.html')); 
});


app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
    
    connection.query(query, [usuario, contraseña], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.send('Credenciales incorrectas');
        }
    });
});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
