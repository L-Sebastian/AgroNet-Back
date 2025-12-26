function loadAboutUsComponent(containerId) {
  fetch("/frontend/public/views/components/24_opinions.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => console.error("Error cargando el componente:", error));
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  loadAboutUsComponent("opinions-container");
});