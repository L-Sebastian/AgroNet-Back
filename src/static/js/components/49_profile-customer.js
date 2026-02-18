document.addEventListener("DOMContentLoaded", () => {
  fetch("/src/templates/components/49_profile-customer.html")
    .then(response => response.text())
    .then(data => {
      const container = document.querySelector(".profile-container");
      if (container) {
        container.innerHTML = data;

        // ===============================
        // 🔹 Lógica para el modal de éxito
        // ===============================
        const addBtn = container.querySelector(".client-profile__edit-btn");
        const modal = container.querySelector("#success_modal");
        const modalContent = container.querySelector(".modal-content");
        const closeBtn = container.querySelector("#close_success");

        if (addBtn && modal && closeBtn && modalContent) {
          // Mostrar modal al hacer clic
          addBtn.addEventListener("click", () => {
            modal.style.display = "flex";
          });

          // Cerrar al hacer clic en la X
          closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            marcarComoAgregado();
          });

          // Cerrar al hacer clic en cualquier parte del modal
          modal.addEventListener("click", () => {
            modal.style.display = "none";
            marcarComoAgregado();
          });

          // Cerrar al hacer clic en el fondo del modal (fuera del contenido)
          modal.addEventListener("click", (e) => {
            if (e.target === modal) {
              modal.style.display = "none";
              marcarComoAgregado();
            }
          });

          // 🔸 Cambiar texto y estilo del botón al cerrar
          function marcarComoAgregado() {
            addBtn.textContent = "Agregado a la libreta";
            addBtn.classList.add("added");
            addBtn.disabled = true;

            // 🔹 OPCIONAL: redirigir después de cerrar
            // window.location.href = "/frontend/public/views/customer-pages/contact_list.html";
          }
        } else {
          console.error("No se encontraron los elementos del modal dentro del componente cargado.");
        }
      }
    })
    .catch(error => console.error("Error al cargar el perfil del cliente:", error));
});
