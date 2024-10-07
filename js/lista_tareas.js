// --------------------------
// Función para cargar perfiles desde el servidor
// --------------------------
async function cargarPerfiles() {
    const response = await fetch('http://localhost:3000/api/perfiles');
    const perfiles = await response.json();
    const listaPerfiles = document.getElementById('listaPerfiles');

    perfiles.forEach(perfil => {
        const divPerfil = document.createElement('div');
        divPerfil.classList.add('perfil');
        divPerfil.dataset.id = perfil.correo;
        divPerfil.innerHTML = `
            <h4>${perfil.nombre}</h4>
            <p>Correo: ${perfil.correo}</p>
            <p>Edad: ${perfil.edad} años</p>
        `;

        // Evento para seleccionar un perfil y cargar sus tareas
        divPerfil.addEventListener('click', () => {
            // Desmarcar cualquier otro perfil seleccionado
            document.querySelectorAll('.perfil').forEach(p => p.classList.remove('selected'));
            divPerfil.classList.add('selected');
            cargarTareas(perfil.correo); // Cargar tareas cuando se selecciona un perfil
        });

        listaPerfiles.appendChild(divPerfil);
    });
}

// --------------------------
// Función para cargar tareas desde el servidor para un perfil específico
// --------------------------
async function cargarTareas(correo) {
    try {
        const response = await fetch(`http://localhost:3000/api/tareasDisponibles/${correo}`);
        
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tareas = await response.json();
        console.log(tareas); // Log para depuración

        // Verifica si la respuesta es un array
        if (!Array.isArray(tareas)) {
            console.error('Error: Se esperaba un array de tareas', tareas);
            alert('Hubo un problema al cargar las tareas. Intenta nuevamente.');
            return;
        }

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

            // Evento para seleccionar/deseleccionar una tarea
            divTarea.addEventListener('click', () => {
                divTarea.classList.toggle('selected');
            });

            listaTareas.appendChild(divTarea);
        });
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        alert('Hubo un problema al cargar las tareas: ' + error.message);
    }
}

// --------------------------
// Función para guardar la selección de tareas
// --------------------------
async function guardarSeleccion() {
    const perfilSeleccionado = document.querySelector('.perfil.selected');
    const tareasSeleccionadas = document.querySelectorAll('.tarea.selected');

    if (!perfilSeleccionado || tareasSeleccionadas.length === 0) {
        alert('Selecciona un perfil y al menos una tarea.');
        return;
    }

    const correoPerfil = perfilSeleccionado.dataset.id; 
    const idsTareas = Array.from(tareasSeleccionadas).map(tarea => tarea.dataset.id);

    const data = {
        correo: correoPerfil,
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

// --------------------------
// Cargar perfiles y tareas al cargar la página
// --------------------------
document.addEventListener('DOMContentLoaded', () => {
    cargarPerfiles();
    document.getElementById('guardarSeleccion').addEventListener('click', guardarSeleccion);
});

app.get('/api/tareasDisponibles/:correo', async (req, res) => {
    const correo = req.params.correo;

    try {
        // Aquí tu lógica para obtener las tareas
        const tareas = await obtenerTareasPorCorreo(correo);
        if (!tareas) {
            return res.status(404).json({ message: 'No se encontraron tareas' });
        }
        res.json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});
