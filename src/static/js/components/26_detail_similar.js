document.addEventListener("DOMContentLoaded", function() {
    const heroElement = document.querySelector(".similar-container");

    if (heroElement) {
        fetch("/frontend/public/views/components/26_detail_similar.html")
            .then(response => response.text())
            .then(data => {
                heroElement.innerHTML = data; 
            })
            .catch(error => console.log("Error al cargar el similar list", error));
    }
});