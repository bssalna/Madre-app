# Madre

    Madre" es una aplicación destinada a gestionar tareas domésticas en el hogar, permitiendo la creación de perfiles individuales para cada miembro, la asignación y programación de tareas según su frecuencia y nivel de esfuerzo, el uso de un sistema de puntaje para equilibrar la carga de trabajo.

    1 HTML y JavaScript capturan los datos

    1 Node.js con Express y MySQL procesan los datos


    MadreAPP/
├── code/
│   ├── configuración.html
│   ├── Creador_de_tareas.sql
│   ├── crear_cuenta.html
│   ├── crear_tarea.html
│   ├── generador_pdf.html
│   ├── iniciar_sesion.html
│   ├── lista_perfiles.html
│   ├── lista_tarea.html
│   ├── menu_principal.html
│   ├── olvide_contrasena.html
│   ├── perfiles.html
│   ├── puntaje_tareas.html
│   ├── tareas.html
├── css/
│   ├── style.css
├── img/
│   ├── add-user-9-svgrepo-com.svg
│   ├── beautiful-mother-and-baby-abstract-by-Vexels.svg
│   ├── ERD.png
│   ├── facebook-svgrepo-com.svg
│   ├── homework-svgrepo-com.svg
│   ├── lista_tarea.svg
│   ├── mother-and-son-silhouettes-svgrepo-com.svg
│   ├── pngwing.com.png
│   ├── profile-svgrepo-com.svg
│   ├── profile-user-svgrepo-com.svg
│   ├── twitter-rounded-svgrepo-com.svg
│   ├── whatsapp-svgrepo-com.svg
├── js/
│   ├── login.js
│   ├── server.js
├── index.html
├── README.md
├── token.txt




1. Tabla: Perfiles
sql
Copiar código
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

2. Tabla: Tareas
sql
Copiar código
CREATE TABLE Tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    valor_tarea DECIMAL(5,2),
    intensidad_tarea VARCHAR(50),
    categoria VARCHAR(100),  
    frecuencia ENUM('diaria', 'semanal', 'mensual')  
);

);

3. Tabla: Realiza
sql
Copiar código
CREATE TABLE Realiza (
    id_realizacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_tarea INT,
    estado ENUM('pendiente', 'completada', 'en progreso') NOT NULL,
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Perfiles(id_usuario),
    FOREIGN KEY (id_tarea) REFERENCES Tareas(id_tarea)
);

4. Tabla: Historial_Tareas 
sql
Copiar código
CREATE TABLE Historial_Tareas (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_realizacion INT,
    fecha_completado DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'completada', 'en progreso') NOT NULL,
    FOREIGN KEY (id_realizacion) REFERENCES Realiza(id_realizacion)
);

## Relaciones

Perfiles ↔ Realiza: Uno a Muchos (1)

Un perfil puede tener múltiples asignaciones de tareas.
Tareas ↔ Realiza: Uno a Muchos (1)

Una tarea puede ser asignada a múltiples usuarios.
Realiza ↔ Historial_Tareas: Uno a Muchos (1)

Cada asignación de tarea puede tener múltiples entradas en el historial.


## Reglas de Negocio

Usuarios

Crear, actualizar y eliminar perfiles (que incluyen la información de inicio de sesión).
Validar que el correo sea único al registrarse.
Tareas

Crear, actualizar y eliminar tareas.
Listar todas las tareas disponibles.
Realiza

Asignar tareas a usuarios con un estado inicial.
Actualizar el estado de las tareas asignadas.
Eliminar asignaciones de tareas.
Historial de Tareas (opcional)

Registrar cambios de estado de las tareas en el historial.
Consultar el historial de cambios.






    
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



no me hice entender es "Necesito que una estructura html en donde los usuarios puedan visualizar las tareas disponibles y las seleccionarlas, de la información tipificada del siguiente cuestionario, con su respectivo codigo jacascript, y node.js 