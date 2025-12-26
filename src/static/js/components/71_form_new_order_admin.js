document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-order");

  if (container) {
    fetch("/frontend/public/views/components/71_form_new_order_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;

        // Esperar a que el contenido esté en el DOM
        const form = document.getElementById("formDatosPedido");
        const popupSuccess = document.getElementById("order_success_popup");

        if (form && popupSuccess) {
          form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita recargar la página
            popupSuccess.classList.add("show"); // Muestra el popup
          });

          // Cerrar popup al hacer clic fuera, dentro o en la X
          popupSuccess.addEventListener("click", (e) => {
            if (
              e.target.classList.contains("close-popup") ||
              e.target === popupSuccess ||
              e.target.closest(".popup-content")
            ) {
              popupSuccess.classList.remove("show");

              // Redirigir después de cerrar (opcional)
              window.location.href = "/frontend/public/views/admin-pages/orders.html";
            }
          });
        }
      });
  }
});

