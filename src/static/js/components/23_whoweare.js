// Cargar el componente "Quiénes Somos"
function loadAboutUsComponent(containerId) {
  fetch("/src/templates/components/23_whoweare.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => console.error("Error cargando el componente:", error));
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  loadAboutUsComponent("about-us-container");
});