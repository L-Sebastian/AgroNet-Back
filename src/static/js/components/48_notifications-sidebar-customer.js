document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".account-content-customer"); 
  // Ajusta el selector según tu layout principal
  if (container) {
    fetch("/frontend/public/views/components/48_notifications-sidebar-customer.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
      })
      .catch(error => console.error("Error al cargar las notificaciones:", error));
  }
});
