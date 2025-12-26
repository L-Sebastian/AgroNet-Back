document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-datos");

  if (container) {
    fetch("/frontend/public/views/components/69_form_new_user_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;

        // Esperar a que el formulario y popup estén cargados
        const form = document.getElementById("formDatosPersonales");
        const popupSuccess = document.getElementById("user_success_popup");

        if (form && popupSuccess) {
          // Mostrar popup al enviar el formulario
          form.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita envío real
            popupSuccess.classList.add("show"); // Muestra el popup
          });

          // Cerrar popup al hacer clic en la X, fuera o dentro del popup
          popupSuccess.addEventListener("click", (e) => {
            if (
              e.target.classList.contains("close-popup") ||
              e.target === popupSuccess ||
              e.target.closest(".popup-content")
            ) {
              popupSuccess.classList.remove("show");

              // Redirigir después de cerrar el popup
              window.location.href = "/frontend/public/views/admin-pages/users.html";
            }
          });
        }
      });
  }
});
