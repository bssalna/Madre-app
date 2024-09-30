// Importación de módulos
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const { body, validationResult } = require('express-validator'); 

// Inicialización de la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,))); 
app.use(express.static(path.join(__dirname, 'code')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'js')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    port: 3306,
    password: 'Contraseña123!', 
    database: 'madre_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Manejo de inicio de sesión
app.post('/login', [
    body('correo').isEmail(),
    body('contrasena').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { correo, contrasena } = req.body;
    const query = 'SELECT * FROM Perfiles WHERE correo = ?';

    db.query(query, [correo], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const match = await bcrypt.compare(contrasena, results[0].contrasena);
            if (match) {
                res.json({ success: true, redirect: '/code/menu_principal.html' });
            } else {
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
            res.status(401).json({ message: 'Correo no encontrado' });
        }
    });
});

// Creación de nuevos perfiles
app.post('/api/perfiles', async (req, res) => {
    const { nombre, edad, estatura, peso, fecha_nacimiento, correo, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10); 

    const sql = 'INSERT INTO Perfiles (nombre, edad, estatura, peso, fecha_nacimiento, correo, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, edad, estatura, peso, fecha_nacimiento, correo, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Perfil creado con éxito' });
    });
});

// Obtener todos los perfiles
app.get('/api/perfiles', (req, res) => {
    const sql = 'SELECT * FROM Perfiles';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Creación de nuevas tareas
app.post('/api/tareas', (req, res) => {
    const { nombre_tarea, descripcion, valor_tarea, frecuencia } = req.body;

    if (!nombre_tarea || !descripcion || !valor_tarea || !frecuencia) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const sql = 'INSERT INTO tareas (nombre_tarea, descripcion, valor_tarea, frecuencia) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre_tarea, descripcion, valor_tarea, frecuencia], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Tarea creada con éxito' });
    });
});

// Obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    const sql = 'SELECT * FROM tareas';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener tareas:', err); 
            return res.status(500).json({ error: err.message });
        }
        console.log('Tareas obtenidas:', results); 
        res.json(results);
    });
});

// Asignar tareas a usuarios
app.post('/api/asignarTareas', async (req, res) => {
    const { id_usuario, tareas } = req.body;

    if (!id_usuario || !tareas || tareas.length === 0) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    try {
        const queryUpdate = `
            UPDATE realiza 
            SET estado = "pendiente"
            WHERE id_usuario = ? AND id_tarea IN (?)
        `;
        
        await db.query(queryUpdate, [id_usuario, tareas]);

        res.json({ message: 'Tareas asignadas con éxito' });
    } catch (error) {
        console.error('Error al asignar tareas:', error);
        res.status(500).json({ message: 'Error al asignar tareas' });
    }
});

// Obtener asignaciones de tareas
app.get('/api/asignaciones', (req, res) => {
    const sql = `
        SELECT r.id_usuario, r.id_tarea
        FROM realiza r
        JOIN Perfiles p ON r.id_usuario = p.id_usuario
    `; 
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Eliminar perfiles
app.delete('/api/perfiles/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Perfiles WHERE id_usuario = ?'; 

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Perfil eliminado con éxito' });
    });
});

// Obtener tareas disponibles para un usuario
app.get('/api/tareasDisponibles/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    
    const sql = `
        SELECT t.id_tarea, t.nombre_tarea, t.descripcion, t.valor_tarea, t.frecuencia
        FROM tareas t
        LEFT JOIN realiza r ON t.id_tarea = r.id_tarea AND r.estado = 'indisponible'
        WHERE r.id_usuario IS NULL OR r.id_usuario = ? AND t.estado = 'disponible' 
    `;

    db.query(sql, [id_usuario], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
