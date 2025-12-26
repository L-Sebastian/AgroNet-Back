document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".login-container");

    if(heroElement) {
        fetch("/frontend/public/views/components/8_form_register.html")
        .then(response => response.text())
        .then(data => {
            heroElement.innerHTML = data; 
        })

    .catch(error => console.log("Error al cargar el navbar", error));
    }
});