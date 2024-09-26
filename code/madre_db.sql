CREATE TABLE Perfiles (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    peso DECIMAL(5,2),
    fecha_nacimiento DATE,
    estatura DECIMAL(5,2)
);


CREATE TABLE Tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    valor_tarea DECIMAL(5,2),
    intensidad_tarea VARCHAR(50),
    categoria VARCHAR(100),  -- Nueva columna para categorizar la tarea
    frecuencia ENUM('diaria', 'semanal', 'mensual')  -- Nueva columna para frecuencia
);



CREATE TABLE Realiza (
    id_realizacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_tarea INT,
    estado ENUM('pendiente', 'completada', 'en progreso') NOT NULL,
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Perfiles(id_usuario),
    FOREIGN KEY (id_tarea) REFERENCES Tareas(id_tarea)
);


CREATE TABLE Historial_Tareas (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_realizacion INT,
    fecha_completado DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'completada', 'en progreso') NOT NULL,
    FOREIGN KEY (id_realizacion) REFERENCES Realiza(id_realizacion)
);