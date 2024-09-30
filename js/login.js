document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`
            });

            const result = await response.json();

            if (response.ok && result.success) {
                window.location.href = result.redirect;
            } else {
                alert(result.message || 'Hubo un error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud: ' + error.message);
        }
    });
});
