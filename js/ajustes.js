document.addEventListener('DOMContentLoaded', async () => {
    await cargarPerfiles();
    await cargarTareas();
    await cargarAsignaciones(); // Cargar tareas asignadas
});

async function cargarPerfiles() {
    const response = await fetch('/api/perfiles');
    const perfiles = await response.json();
    const tbody = document.querySelector('#tablaPerfiles tbody');

    perfiles.forEach(perfil => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${perfil.correo}</td>
            <td>${perfil.nombre}</td>
            <td><button onclick="eliminarPerfil(${perfil.id_usuario})">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function cargarTareas() {
    const response = await fetch('/api/tareas');
    const tareas = await response.json();
    const tbody = document.querySelector('#tablaTareas tbody');

    tareas.forEach(tarea => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${tarea.nombre_tarea}</td>
            <td><button onclick="eliminarTarea(${tarea.id_tarea})">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function cargarAsignaciones() {
    const response = await fetch('/api/asignaciones'); // Obtener asignaciones
    const asignaciones = await response.json();
    const tbody = document.querySelector('#tablaAsignaciones tbody');

    asignaciones.forEach(asignacion => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${asignacion.id_usuario}</td>
            <td>${asignacion.id_tarea}</td>
            <td><button onclick="eliminarAsignacion(${asignacion.id_usuario}, ${asignacion.id_tarea})">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function eliminarPerfil(id) {
    const response = await fetch(`/api/perfiles/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        alert('Perfil eliminado con éxito');
        location.reload(); // Recargar la página para actualizar la tabla
    } else {
        alert('Error al eliminar el perfil');
    }
}

async function eliminarTarea(id) {
    const response = await fetch(`/api/tareas/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        alert('Tarea eliminada con éxito');
        location.reload(); // Recargar la página para actualizar la tabla
    } else {
        alert('Error al eliminar la tarea');
    }
}

async function eliminarAsignacion(id_usuario, id_tarea) {
    // Aquí podrías crear un endpoint para eliminar asignaciones, por ejemplo:
    const response = await fetch(`/api/asignaciones/${id_usuario}/${id_tarea}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        alert('Tarea asignada eliminada con éxito');
        location.reload(); // Recargar la página para actualizar la tabla
    } else {
        alert('Error al eliminar la tarea asignada');
    }
}
