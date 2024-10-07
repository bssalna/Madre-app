document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/perfilesConTareasIndisponibles')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('perfilesContainer');
            container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

            data.forEach(item => {
                const perfilDiv = document.createElement('div');
                perfilDiv.className = 'perfil';
                perfilDiv.innerHTML = `
                    <h3>${item.nombre_perfil}</h3>
                    <div class="tareas">
                        <p>Tarea: ${item.nombre_tarea}</p>
                        <p>Frecuencia: ${item.frecuencia}</p>
                    </div>
                `;
                container.appendChild(perfilDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});
