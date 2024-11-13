document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form'); 

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Convertimos a JSON para envío
        console.log("Datos enviados:", data); // Paso 1: Verificar datos

        try {
            const response = await fetch('/api/perfiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // Enviar como JSON
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtener mensaje del servidor
                if (errorData.message === 'El perfil ya existe') {
                    alert('¡El perfil ya existe!'); // Alert específico si ya existe
                    return;
                }
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert('Perfil creado con éxito'); // Alert indicando que el perfil fue creado
            window.location.href = './iniciar_sesion.html'; // Redirigir a iniciar sesión
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Hubo un error al crear el perfil'); // Alert general
        }
    });
});


