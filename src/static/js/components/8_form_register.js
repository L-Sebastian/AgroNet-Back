document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".login-container");

    if(heroElement) {
        fetch("/src/templates/components/8_form_register.html")
        .then(response => response.text())
        .then(data => {
            heroElement.innerHTML = data; 
        })

    .catch(error => console.log("Error al cargar el navbar", error));
    }
});