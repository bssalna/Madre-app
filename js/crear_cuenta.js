document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.formcrear form'); // Selecciona el formulario

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = new URLSearchParams(formData).toString();

        try {
            const response = await fetch('/api/perfiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message); // Mostrar mensaje de éxito
            window.location.href = './iniciar_sesion.html'; // Redirigir al menú principal
        } catch (error) {
            console.error('Error:', error);
            alert('¡El miembro ya existe!');
        }
    });
});
