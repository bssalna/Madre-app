// Función para cargar perfiles desde el servidor
async function cargarPerfiles() {
    const response = await fetch('http://localhost:3000/api/perfiles'); // Cambia la URL aquí
    const perfiles = await response.json();
    const listaPerfiles = document.getElementById('listaPerfiles');

    perfiles.forEach(perfil => {
        const divPerfil = document.createElement('div');
        divPerfil.classList.add('perfil');
        divPerfil.dataset.id = perfil.id_usuario;
        divPerfil.innerHTML = `
            <h4>${perfil.nombre}</h4>
            <p>Correo: ${perfil.correo}</p>
            <p>Edad: ${perfil.edad} años</p>
        `;

        divPerfil.addEventListener('click', () => {
            // Desmarcar cualquier otro perfil seleccionado
            document.querySelectorAll('.perfil').forEach(p => p.classList.remove('selected'));
            divPerfil.classList.add('selected');
            cargarTareas(perfil.id_usuario); // Cargar tareas cuando se selecciona un perfil
        });

        listaPerfiles.appendChild(divPerfil);
    });
}

// Función para cargar tareas desde el servidor para un perfil específico
async function cargarTareas(id_usuario) {
    const response = await fetch(`http://localhost:3000/api/tareasDisponibles/${id_usuario}`); // Cambia la URL aquí
    const tareas = await response.json();
    const listaTareas = document.getElementById('listaTareas');

    // Limpia la lista de tareas antes de cargar
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const divTarea = document.createElement('div');
        divTarea.classList.add('tarea');
        divTarea.dataset.id = tarea.id_tarea;
        divTarea.innerHTML = `
            <h4>${tarea.nombre_tarea}</h4>
            <p>${tarea.descripcion}</p>
            <p>Complejidad: ${tarea.valor_tarea} puntos</p>
            <p>Frecuencia: ${tarea.frecuencia}</p>
        `;

        divTarea.addEventListener('click', () => {
            divTarea.classList.toggle('selected');
        });

        listaTareas.appendChild(divTarea);
    });
}

// Función para guardar la selección de tareas
async function guardarSeleccion() {
    const perfilSeleccionado = document.querySelector('.perfil.selected');
    const tareasSeleccionadas = document.querySelectorAll('.tarea.selected');

    if (!perfilSeleccionado || tareasSeleccionadas.length === 0) {
        alert('Selecciona un perfil y al menos una tarea.');
        return;
    }

    const idPerfil = perfilSeleccionado.dataset.id; // Asumimos que tienes el ID en el dataset
    const idsTareas = Array.from(tareasSeleccionadas).map(tarea => tarea.dataset.id); // Asumimos lo mismo para las tareas

    const data = {
        id_usuario: idPerfil,
        tareas: idsTareas
    };

    try {
        const response = await fetch('http://localhost:3000/api/asignarTareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Tareas asignadas con éxito');
            // Opcional: ocultar las tareas asignadas
            idsTareas.forEach(idTarea => {
                const tarea = document.querySelector(`.tarea[data-id="${idTarea}"]`);
                if (tarea) {
                    tarea.remove(); // Elimina la tarea de la lista
                }
            });
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud: ' + error.message);
    }
}

// Cargar perfiles y tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPerfiles();
    document.getElementById('guardarSeleccion').addEventListener('click', guardarSeleccion);
});
