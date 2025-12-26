document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".navbar-seller-container");

    if(heroElement) {
        fetch("/frontend/public/views/components/43_navbar_seller2.0.html")
        .then(response => response.text())
        .then(data => {
            heroElement.innerHTML = data; 
        })

    .catch(error => console.log("Error al cargar el hero", error));
    }
});