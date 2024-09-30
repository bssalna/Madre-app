    perfiles (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    peso DECIMAL(5,2),
    fecha_nacimiento DATE,
    estatura DECIMAL(5,2)
);


tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tarea VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    valor_tarea INT NOT NULL,
    frecuencia VARCHAR(255) NOT NULL,
    estado ENUM('disponible', 'indisponible') DEFAULT 'disponible' 
);




    realiza (
    id_usuario INT(11),
    id_tarea INT(11),
    estado ENUM('disponible', 'indisponible') NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_tarea),
    FOREIGN KEY (id_usuario) REFERENCES perfiles(id_usuario),
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea)
);

);


