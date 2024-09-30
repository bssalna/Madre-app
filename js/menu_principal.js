document.addEventListener('DOMContentLoaded', async () => {
    const perfilesContainer = document.getElementById('perfilesContainer');

    try {
        // Obtener perfiles
        const perfilesResponse = await fetch('/api/perfiles');
        const perfiles = await perfilesResponse.json();

        // Obtener tareas
        const tareasResponse = await fetch('/api/tareas');
        const tareas = await tareasResponse.json();

        // Obtener asignaciones de tareas
        const asignacionesResponse = await fetch('/api/asignaciones'); // Crear este endpoint
        const asignaciones = await asignacionesResponse.json();

        // Agrupar tareas por usuario
        const tareasPorUsuario = {};
        asignaciones.forEach(asignacion => {
            if (!tareasPorUsuario[asignacion.id_usuario]) {
                tareasPorUsuario[asignacion.id_usuario] = [];
            }
            tareasPorUsuario[asignacion.id_usuario].push(asignacion.id_tarea);
        });

        // Generar el contenido HTML para cada perfil
        perfiles.forEach(perfil => {
            const perfilDiv = document.createElement('div');
            perfilDiv.classList.add('perfil');

            // Título del perfil
            perfilDiv.innerHTML = `<h3>${perfil.nombre}</h3>`;

            // Tareas asignadas
            const tareasDiv = document.createElement('div');
            tareasDiv.classList.add('tareas');
            const tareasAsignadas = tareasPorUsuario[perfil.id_usuario] || [];

            tareasAsignadas.forEach(tareaId => {
                const tarea = tareas.find(t => t.id_tarea === tareaId);
                if (tarea) {
                    tareasDiv.innerHTML += `<p>${tarea.nombre_tarea}: ${tarea.descripcion} (${tarea.frecuencia})</p>`;
                }
            });

            perfilDiv.appendChild(tareasDiv);
            perfilesContainer.appendChild(perfilDiv);
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
});
