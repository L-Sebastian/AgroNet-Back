document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".new-password-container");

  if (container) {
    fetch("/src/templates/components/83_confirm_forgot_password.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        const form = container.querySelector(".new-password__form");
        const inputs = container.querySelectorAll(".new-password__input");
        const toggles = container.querySelectorAll(".new-password__toggle");
        const popup = container.querySelector(".popup--password-success");

        if (!form || inputs.length < 2 || !popup) return;

        const passwordInput = inputs[0];
        const confirmInput = inputs[1];

        // Alternar visibilidad de contraseñas
        toggles.forEach((toggle) => {
          toggle.addEventListener("click", () => {
            const input = toggle.previousElementSibling;
            const icon = toggle.querySelector("i");

            if (input.type === "password") {
              input.type = "text";
              icon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
              input.type = "password";
              icon.classList.replace("fa-eye-slash", "fa-eye");
            }
          });
        });

        // daValidar y mostrar popup
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const password = passwordInput.value.trim();
          const confirm = confirmInput.value.trim();

          if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
          }

          if (password !== confirm) {
            alert("Las contraseñas no coinciden.");
            return;
          }

          // Mostrar popup de éxito
          popup.classList.add("show");
        });

        // Cerrar popup al hacer clic fuera de la card o en la X
        popup.addEventListener("click", (e) => {
          if (
            e.target.classList.contains("popup") ||
            e.target.closest(".popup__close")
          ) {
            popup.classList.remove("show");
            //Redirigir al login
            window.location.href = "/src/templates/pages-general/login.html";
          }
        });
      })
      .catch((error) =>
        console.error("Error al cargar el componente de nueva contraseña:", error)
      );
  }
});
