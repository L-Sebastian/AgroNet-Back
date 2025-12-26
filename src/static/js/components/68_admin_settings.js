document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".settings-container");

  if (container) {
    fetch("/frontend/public/views/components/68_admin_settings.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
        initSettingsPopups(); // inicializa las ventanas emergentes
      })
      .catch(error => console.error("Error al cargar el componente Settings:", error));
  }
});

function initSettingsPopups() {
  // Botones del formulario
  const btnGuardar = document.querySelector(".admin-settings__btn");
  const btnPassword = document.querySelector(".admin-settings__btn--secure");

  // Ventanas emergentes
  const confirmPopup = document.getElementById("confirm_settings_popup");
  const successPopup = document.getElementById("success_settings_popup");

  // Botones internos de confirmación
  const cancelBtn = confirmPopup.querySelector(".cancel");
  const acceptBtn = confirmPopup.querySelector(".accept");

  // Función para abrir popup de confirmación
  function openConfirmPopup() {
    confirmPopup.classList.add("show");
  }

  // Abrir confirmación al hacer clic en guardar o actualizar contraseña
  if (btnGuardar) {
    btnGuardar.addEventListener("click", e => {
      e.preventDefault();
      openConfirmPopup();
    });
  }

  if (btnPassword) {
    btnPassword.addEventListener("click", e => {
      e.preventDefault();
      openConfirmPopup();
    });
  }

  // Cerrar popup de confirmación (cancelar)
  cancelBtn.addEventListener("click", () => {
    confirmPopup.classList.remove("show");
  });

  // Aceptar → cerrar confirmación y mostrar éxito
  acceptBtn.addEventListener("click", () => {
    confirmPopup.classList.remove("show");
    successPopup.classList.add("show");
  });

  // Cerrar popup de éxito (X o clic)
  const closeButtons = successPopup.querySelectorAll(".close-popup, .popup-content");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      successPopup.classList.remove("show");
      // 🔁 Redirige después de cerrar
      window.location.href = "/frontend/public/views/admin-pages/settings.html";
    });
  });

  // Cerrar también al hacer clic en la X del popup de confirmación
  const closeConfirm = confirmPopup.querySelector(".close-popup");
  closeConfirm.addEventListener("click", () => {
    confirmPopup.classList.remove("show");
  });
}
