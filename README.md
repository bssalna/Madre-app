# Madre

    Madre" es una aplicación destinada a gestionar tareas domésticas en el hogar, permitiendo la creación de perfiles individuales para cada miembro, la asignación y programación de tareas según su frecuencia y nivel de esfuerzo, el uso de un sistema de puntaje para equilibrar la carga de trabajo.

    MadreAPP/
│
├── code/
│   ├── menu principal/
│   │   ├── configuración.html
│   │   ├── crear_perfil.html
│   │   ├── crear_tarea.html
│   │   ├── generador_pdf.html
│   │   ├── lista_perfiles.html
│   │   ├── lista_tarea.html
│   │   ├── puntaje_tareas.html
│   │   ├── tareas.html
│   │   ├── Creador_de_tareas.html
│   │   ├── crear_cuenta.html
│   │   ├── index.html
│   │   ├── iniciar_sesion.html
│   │   ├── olvidar_contrasena.html
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   ├── (varias imágenes)
│   ├── js/
│   │   ├── login.js
│   │   ├── server.js
│   ├── README.md
│   └── token.txt



-- Crear la base de datos
CREATE DATABASE MadreDB;

USE MadreDB;

-- Crear tablas
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE Perfiles (
    id_usuario INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    peso DECIMAL(5,2),
    fecha_nacimiento DATE,
    estatura DECIMAL(5,2),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    valor_tarea DECIMAL(5,2) NOT NULL,
    intensidad_tarea VARCHAR(50) NOT NULL
);

CREATE TABLE Realiza (
    id_realizacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_tarea INT,
    estado VARCHAR(50) NOT NULL,
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Perfiles(id_usuario),
    FOREIGN KEY (id_tarea) REFERENCES Tareas(id_tarea)
);

CREATE TABLE Historial_Tareas (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_realizacion INT,
    fecha_completado DATETIME,
    FOREIGN KEY (id_realizacion) REFERENCES Realiza(id_realizacion)
);

    

 ## Relaciones


Usuarios ↔ Perfiles

Relación: Uno a Uno (1:1)
Descripción: Cada usuario tiene un único perfil, y cada perfil pertenece a un único usuario.

Perfiles ↔ Realiza

Relación: Uno a Muchos (1)
Descripción: Un perfil puede tener múltiples asignaciones de tareas, pero cada asignación de tarea pertenece a un solo perfil.

Tareas ↔ Realiza

Relación: Uno a Muchos (1)
Descripción: Una tarea puede ser asignada a múltiples usuarios a través de diferentes registros en la tabla Realiza, pero cada registro de asignación de tarea se refiere a una sola tarea.

Realiza ↔ Historial_Tareas 
Relación: Uno a Muchos (1)
Descripción: Cada asignación de tarea puede tener múltiples entradas en el historial, registrando diferentes momentos de estado (completado, pendiente, etc.), pero cada entrada de historial se refiere a una sola asignación.

2. Diagrama de Relaciones


Usuarios (1) ↔ (1) Perfiles
Perfiles (1) ↔ (N) Realiza
Tareas (1) ↔ (N) Realiza
Realiza (1) ↔ (N) Historial_Tareas (opcional)


Resumen de Relaciones

Uno a Uno (1:1):
Usuarios a Perfiles

Uno a Muchos (1):
Perfiles a Realiza

Tareas a Realiza
Realiza a Historial_Tareas (opcional)

   ### Reglas del negocio

## Reglas de Negocio

1. Usuarios

Crear un usuario: Se debe permitir registrar un nuevo usuario proporcionando un correo y una contraseña.
Verificar correo único: El correo debe ser único en la base de datos para evitar duplicados.
Iniciar sesión: Los usuarios deben poder iniciar sesión utilizando su correo y contraseña.
Actualizar usuario: Los usuarios pueden actualizar su información (correo, contraseña) si es necesario.
Eliminar usuario: Se debe permitir eliminar un usuario, lo que también eliminará su perfil y sus tareas asignadas.

2. Perfiles

Crear un perfil: Al crear un nuevo usuario, se debe crear automáticamente un perfil con los datos proporcionados (nombre, edad, peso, estatura, fecha de nacimiento).
Actualizar perfil: Los usuarios pueden modificar su perfil (nombre, edad, peso, estatura, fecha de nacimiento).
Eliminar perfil: Al eliminar un usuario, el perfil asociado también debe ser eliminado.

3. Tareas

Crear una tarea: Permitir registrar una nueva tarea con nombre, descripción, valor y nivel de intensidad.
Actualizar tarea: Los administradores o usuarios con permisos deben poder modificar los detalles de una tarea existente.
Eliminar tarea: Las tareas pueden ser eliminadas si no están asignadas a ningún usuario (o, en caso contrario, se debe manejar adecuadamente la eliminación).
Listar tareas: Los usuarios deben poder ver todas las tareas disponibles.

4. Realiza (Asignación de Tareas)

Asignar tarea a usuario: Los administradores o usuarios autorizados pueden asignar tareas a un usuario específico.
Actualizar estado de tarea: Los usuarios pueden cambiar el estado de las tareas (pendiente, en progreso, completada) según el avance.
Eliminar asignación: Se puede eliminar una asignación de tarea a un usuario, lo que eliminará la entrada en la tabla Realiza.
Historial de tareas: Se debe registrar el historial de estado de las tareas para poder rastrear el progreso.

5. Historial de Tareas (opcional)

Registrar cambios de estado: Cada vez que se cambie el estado de una tarea, se debe registrar en el historial con la fecha y hora.
Consultar historial: Los usuarios pueden consultar el historial de cambios de estado de sus tareas.

    
# Temas por implementar

 #### Sistemas autentificacion con roles de usuario

 ##### rol administrador cabeza de hogar: 

   - crea tareas, actualiza la tarea, elimina la tarea
   - crea alimentos, actualiza alimentos, elimina alimentos

 ##### rol miembro cabeza de hogar: selecciona las tareas disponibles, acceso 

   - selecciona tareas, descarga pdf, seguimiento a tareas, control imc, administrador de gastos.

 #### Modulo Administrador de gastos

 #### subodulo de asiganar tareas dentro de lista de tareas

 #### Modulo de Alimentacion

 #### submodulo dentro de alimentacion con control de imc

 #### Modulo PDF

 #### Modulo de configuracion



