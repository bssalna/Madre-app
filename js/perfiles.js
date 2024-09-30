document.addEventListener("DOMContentLoaded", async () => {
    const listaPerfiles = document.getElementById('listaPerfiles');
    const verTareasButton = document.getElementById('verTareas');
    let selectedProfileId = null;

    // Función para cargar perfiles desde el servidor
    async function loadProfiles() {
        try {
            const response = await fetch('http://localhost:3000/api/perfiles');
            const perfiles = await response.json();

            perfiles.forEach(perfil => {
                const perfilDiv = document.createElement('div');
                perfilDiv.classList.add('perfil');
                perfilDiv.textContent = `${perfil.nombre} (Correo: ${perfil.correo})`;
                perfilDiv.onclick = () => selectProfile(perfil.id_usuario, perfilDiv);
                listaPerfiles.appendChild(perfilDiv);
            });
        } catch (error) {
            console.error('Error cargando perfiles:', error);
            listaPerfiles.innerHTML = '<p>Error al cargar perfiles.</p>';
        }
    }

    // Función para seleccionar un perfil
    function selectProfile(id, element) {
        if (selectedProfileId) {
            document.getElementById(`perfil-${selectedProfileId}`).classList.remove('selected');
        }
        selectedProfileId = id;
        element.classList.add('selected');
    }

    // Lógica para el botón "Ver Tareas"
    verTareasButton.onclick = () => {
        if (selectedProfileId) {
            window.location.href = `tareas.html?perfilId=${selectedProfileId}`; // O la URL que corresponda
        } else {
            alert('Por favor, selecciona un perfil primero.');
        }
    };

    loadProfiles();
});
