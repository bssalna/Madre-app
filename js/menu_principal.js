document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/perfilesConTareasIndisponibles')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('perfilesContainer');
            container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

            // Crear un objeto para agrupar las tareas por perfil
            const perfiles = {};

            data.forEach(item => {
                const { nombre_perfil, nombre_tarea, frecuencia } = item;

                // Si el perfil no existe en el objeto, inicializarlo
                if (!perfiles[nombre_perfil]) {
                    perfiles[nombre_perfil] = [];
                }

                // Agregar la tarea al perfil
                perfiles[nombre_perfil].push({ nombre_tarea, frecuencia });
            });

            // Iterar sobre los perfiles para crear el HTML
            for (const perfil in perfiles) {
                const perfilDiv = document.createElement('div');
                perfilDiv.className = 'perfil';
                perfilDiv.innerHTML = `<h3>${perfil}</h3>`;
                
                // Crear un contenedor para las tareas
                const tareasDiv = document.createElement('div');
                tareasDiv.className = 'tareas';

                // Añadir las tareas del perfil al contenedor
                perfiles[perfil].forEach(tarea => {
                    const tareaP = document.createElement('p');
                    tareaP.innerHTML = `Tarea: ${tarea.nombre_tarea}, Frecuencia: ${tarea.frecuencia}`;
                    tareasDiv.appendChild(tareaP);
                });

                // Añadir el contenedor de tareas al perfil
                perfilDiv.appendChild(tareasDiv);

                // Añadir el perfil completo al contenedor principal
                container.appendChild(perfilDiv);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});

