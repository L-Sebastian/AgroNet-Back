document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-product");

  if (container) {
    fetch("/frontend/public/views/components/70_form_new_product_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;

        // Esperar a que el contenido cargue
        const form = document.getElementById("formDatosPersonales");
        const popupSuccess = document.getElementById("product_success_popup");

        if (form && popupSuccess) {
          // Mostrar popup al enviar el formulario
          form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita el envío real
            popupSuccess.classList.add("show"); // Muestra el popup
          });

          // Cerrar popup al hacer clic dentro, fuera o en la X
          popupSuccess.addEventListener("click", (e) => {
            if (
              e.target.classList.contains("close-popup") ||
              e.target === popupSuccess ||
              e.target.closest(".popup-content")
            ) {
              popupSuccess.classList.remove("show");

              // Redirigir después de cerrar (opcional)
              window.location.href = "/frontend/public/views/admin-pages/products.html";
            }
          });
        }
      });
  }
});
