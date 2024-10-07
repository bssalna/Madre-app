# Madre

    Madre" es una aplicación destinada a gestionar tareas domésticas en el hogar, permitiendo la creación de perfiles individuales para cada miembro, la asignación y programación de tareas según su frecuencia y nivel de esfuerzo, el uso de un sistema de puntaje para equilibrar la carga de trabajo.

    1 HTML y JavaScript capturan los datos

    1 Node.js con Express y MySQL procesan los datos


MadreAPP/

├── code/
│   ├── ajustes.html
│   ├── configuración.html
│   ├── crear_cuenta.html
│   ├── crear_tarea.html
│   ├── generador_pdf.html
│   ├── iniciar_sesion.html
│   ├── lista_perfiles.html
│   ├── lista_tareas.html
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
│   ├── crear_cuenta.js
│   ├── crear_tareas.js
│   ├── login.js
│   ├── server.js
│   ├── lista_tarea.js          
├── index.html
├── README.md
├── token.txt


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