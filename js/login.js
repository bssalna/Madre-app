document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `usuario=${encodeURIComponent(usuario)}&contraseña=${encodeURIComponent(contraseña)}`
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud.');
        }
    });
});
