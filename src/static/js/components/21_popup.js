document.addEventListener("DOMContentLoaded", function () {
  // 1. Cargar el formulario
  fetch("/frontend/public/views/components/4_form_new__account.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector(".loginforgot-container").innerHTML = data;

      // 2. Cargar el modal después del formulario
      return fetch("/frontend/public/views/components/21_popup.html");
    })
    .then(response => response.text())
    .then(modalHTML => {
      document.querySelector(".modal-container").innerHTML = modalHTML;

      // 3. Capturar formulario y modal
      const form = document.getElementById("formRegistro");
      const modal = document.getElementById("modal");
      const closeBtn = modal.querySelector(".close");
      const okIcon = modal.querySelector(".ok"); // ✔ icon

      if (!form) {
        console.error("No se encontró el formulario con id='formRegistro'");
        return;
      }

      // 4. Mostrar modal al enviar formulario
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
      });

      // Cerrar al hacer clic en X
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        cargarLogin();
      });

      // Cerrar al hacer clic en ✔
      okIcon.addEventListener("click", () => {
        modal.style.display = "none";
        cargarLogin();
      });

      // Cerrar al hacer clic fuera del modal
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          cargarLogin();
        }
      });
    })
    .catch(err => console.error("Error al cargar componentes:", err));
});

// Función para cargar login
function cargarLogin() {
  fetch("/frontend/public/views/components/8_form_register.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector(".loginforgot-container").innerHTML = html;
    })
    .catch(err => console.log("Error al cargar login", err));
}



