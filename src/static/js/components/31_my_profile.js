document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".info-profile");

    if(heroElement) {
        // fetch("/frontend/public/views/components/31_my_profile.html")
        fetch("/src/templates/components/31_my_profile.html")
        .then(response => response.text())
        .then(data => {
            heroElement.innerHTML = data; 
        })

    .catch(error => console.log("Error al cargar el navbar", error));
    }
});