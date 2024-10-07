CREATE TABLE perfiles (
    correo VARCHAR(255) PRIMARY KEY,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    peso DECIMAL(5,2),
    fecha_nacimiento DATE,
    estatura DECIMAL(5,2)
);

CREATE TABLE tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tarea VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    valor_tarea INT NOT NULL,
    frecuencia VARCHAR(255) NOT NULL,
    estado ENUM('disponible', 'indisponible') DEFAULT 'disponible'
);

CREATE TABLE realiza (
    correo VARCHAR(255),
    id_tarea INT(11),
    estado ENUM('disponible', 'indisponible') NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (correo, id_tarea),
    FOREIGN KEY (correo) REFERENCES perfiles(correo),
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea)
);
