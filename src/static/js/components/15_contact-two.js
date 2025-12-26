// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el contenedor donde se inyectará el componente
  const container = document.querySelector(".contact-two-container");
  if (!container) return; // Si no existe el contenedor, termina la ejecución

  // Rutas de los archivos HTML y CSS del componente
  const htmlPath = "/frontend/public/views/components/15_contact-two.html";
  const cssPath = "/frontend/public/css/components/15_contact-two.css";

  // Inyectar CSS del componente solo si aún no está presente en el documento
  if (!document.querySelector(`link[href="${cssPath}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssPath;
    document.head.appendChild(link); // Agrega el CSS al <head>
  }

  // Cargar el archivo HTML del componente con fetch
  fetch(htmlPath)
    .then(res => {
      // Si hay error en la petición, lanza excepción
      if (!res.ok) throw new Error("Error al cargar componente");
      return res.text(); // Convierte la respuesta en texto (HTML)
    })
    .then(html => {
      // Inserta el HTML cargado dentro del contenedor
      container.innerHTML = html;
      // Inicializa los handlers de los botones (abrir mapa y atrás)
      initContactTwoHandlers();
    })
    .catch(err => console.error("Error cargando 15_contact-two.html:", err));
});

/* -----------------------
   Funciones para manejar botones
   ----------------------- */
function initContactTwoHandlers() {
  // Handler para el botón de "abrir en Google Maps"
  const openBtn = document.querySelector(".contact-two__open-maps");
  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Previene comportamiento por defecto
      // Usa las coordenadas del dataset o unas por defecto
      const coords = openBtn.dataset.coords || "4.836898701426531, -75.68093176016761";
      // Construye la URL para abrir Google Maps con esas coordenadas
      const url = `https://www.google.com/maps?q=${encodeURIComponent(coords)}`;
      // Abre Google Maps en una nueva pestaña
      window.open(url, "_blank", "noopener");
    });
  }

  // Handler para el botón de "atrás"
  const backBtn = document.querySelector(".contact-two__back");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Previene comportamiento por defecto
      // Si hay historial previo, regresa a la página anterior
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Si no hay historial, redirige al inicio
        window.location.href = "/";
      }
    });
  }
}
