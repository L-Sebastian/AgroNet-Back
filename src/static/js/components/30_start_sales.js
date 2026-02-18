document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".profile-sales");

    if(heroElement) {
        // fetch("/frontend/public/views/components/30_start_sales.html")
        fetch("/src/templates/components/30_start_sales.html")       
        .then(response => response.text())
        .then(data => {
            heroElement.innerHTML = data; 
        })

    .catch(error => console.log("Error al cargar el navbar", error));
    }
});