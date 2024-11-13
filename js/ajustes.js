document.addEventListener('DOMContentLoaded', () => {
    cargarPerfiles();
    cargarTareas();
    cargarSelects();
});

// Cargar perfiles
async function cargarPerfiles() {
    const response = await fetch('/api/perfiles');
    const perfiles = await response.json();
    const tbody = document.querySelector('#tablaPerfiles tbody');
    tbody.innerHTML = '';

    perfiles.forEach(perfil => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${perfil.correo}</td>
            <td>${perfil.nombre}</td>
            <td><button class="botones" onclick="eliminarPerfil('${perfil.correo}')">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Eliminar perfil
async function eliminarPerfil(correo) {
    const response = await fetch(`/api/perfiles/${correo}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        cargarPerfiles(); // Volver a cargar perfiles después de eliminar
    } else {
        const errorData = await response.json();
        alert(`Error al eliminar perfil: ${errorData.error}`);
    }
}


// Cargar tareas
async function cargarTareas() {
    const response = await fetch('/api/tareas');
    const tareas = await response.json();
    const tbody = document.querySelector('#tablaTareas tbody');
    tbody.innerHTML = '';

    tareas.forEach(tarea => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tarea.nombre_tarea}</td>
            <td>${tarea.descripcion}</td>
            <td><button class="botones" onclick="eliminarTarea(${tarea.id_tarea})">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Eliminar tarea
async function eliminarTarea(id_tarea) {
    const response = await fetch(`/api/tareas/${id_tarea}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        cargarTareas();
    } else {
        alert('Error al eliminar tarea');
    }
}

// Cargar tareas asignadas
async function cargarTareasAsignadas() {
    const response = await fetch('/api/tareas_asignadas');
    const tareasAsignadas = await response.json();
    const tbody = document.querySelector('#tablaTareasAsignadas tbody');
    tbody.innerHTML = '';

    tareasAsignadas.forEach(tarea => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tarea.correo}</td>
            <td>${tarea.nombre_tarea}</td>
            <td><button class="botones" onclick="desasignarTarea(${tarea.id_tarea}, '${tarea.correo}')">Desasignar</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Desasignar tarea
async function desasignarTarea(id_tarea, correo) {
    const response = await fetch(`/api/desasignar_tarea/${id_tarea}/${correo}`, {
        method: 'PUT'
    });
    if (response.ok) {
        cargarTareasAsignadas(); // Volver a cargar las tareas asignadas
        cargarTareas(); // Volver a cargar la lista de tareas
    } else {
        alert('Error al desasignar tarea');
    }
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPerfiles();
    cargarTareas();
    cargarTareasAsignadas(); // Llamar la nueva función
    cargarSelects();
});

