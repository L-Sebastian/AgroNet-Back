document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".recover-container");

    if(heroElement) {
        fetch("/frontend/public/views/components/11_forgot_password.html")
        .then(response => response.text())
        .then(data => {
            heroElement.innerHTML = data; 
        })

    .catch(error => console.log("Error al cargar el formulario de recuperación", error));
    }
});