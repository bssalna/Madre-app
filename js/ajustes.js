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
            <td><button onclick="eliminarPerfil('${perfil.correo}')">Eliminar</button></td>
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
        cargarPerfiles();
    } else {
        alert('Error al eliminar perfil');
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
            <td><button onclick="eliminarTarea(${tarea.id_tarea})">Eliminar</button></td>
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

// Cargar selects para desasignar tareas
async function cargarSelects() {
    const responsePerfiles = await fetch('/api/perfiles');
    const perfiles = await responsePerfiles.json();
    const selectPerfiles = document.getElementById('selectPerfiles');

    perfiles.forEach(perfil => {
        const option = document.createElement('option');
        option.value = perfil.correo;
        option.textContent = perfil.nombre;
        selectPerfiles.appendChild(option);
    });

    const responseTareas = await fetch('/api/tareas');
    const tareas = await responseTareas.json();
    const selectTareas = document.getElementById('selectTareas');

    tareas.forEach(tarea => {
        const option = document.createElement('option');
        option.value = tarea.id_tarea;
        option.textContent = tarea.nombre_tarea;
        selectTareas.appendChild(option);
    });

    document.getElementById('btnDesasignar').onclick = () => desasignarTarea(selectPerfiles.value, selectTareas.value);
}

// Desasignar tarea
async function desasignarTarea(correo, id_tarea) {
    const response = await fetch(`/api/desasignarTarea`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, id_tarea })
    });
    if (response.ok) {
        alert('Tarea desasignada correctamente');
    } else {
        alert('Error al desasignar tarea');
    }
}
