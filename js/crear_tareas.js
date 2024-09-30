document.getElementById('crearTareaForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Tarea creada con éxito!');
            
            // Limpiar los campos del formulario después de la creación exitosa
            this.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud: ' + error.message);
    }
});


