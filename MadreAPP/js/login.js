document.addEventListener("DOMContentLoaded", () => 
    {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        const usuario = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;

        // Aquí se debería conectar con una base de datos o API para validar las credenciales
        if (usuario === "correctUser" && contraseña === "correctPassword") {
            window.location.href = "../code/menu_principal/menu_principal.html"; // Redirige al menú principal
        } else {
            alert("Credenciales incorrectas, por favor intente de nuevo.");
        }
    });

    // Manejo del botón "Crear cuenta"
    const crearCuentaBtn = document.getElementById('submitcrearcuenta');
    crearCuentaBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto
        window.location.href = "../code/crear_cuenta.html"; // Redirige a la página de creación de cuenta
    });
});
