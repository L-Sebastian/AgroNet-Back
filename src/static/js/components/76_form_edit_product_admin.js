document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-edit-product");
  if (container) {
    fetch("/frontend/public/views/components/76_form_edit_product_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;
        setTimeout(() => initEditProductPopups(), 100);
      });
  }
});

function initEditProductPopups() {
  const form = document.querySelector("#formDatosPersonales");
  const confirmPopup = document.querySelector("#confirm_edit_popup");
  const successPopup = document.querySelector("#edit_success_popup");

  if (!form || !confirmPopup || !successPopup) {
    console.warn("⚠️ No se encontraron los elementos del formulario o popups.");
    return;
  }

  const confirmAccept = confirmPopup.querySelector(".btn.accept");
  const confirmCancel = confirmPopup.querySelector(".btn.cancel");
  const confirmClose = confirmPopup.querySelector(".close-popup");
  const successClose = successPopup.querySelector(".close-popup");

  // 🟠 Mostrar popup de confirmación al intentar guardar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmPopup.classList.add("show");
  });

  // 🔴 Cerrar el popup de confirmación
  [confirmCancel, confirmClose].forEach(btn => {
    btn.addEventListener("click", () => confirmPopup.classList.remove("show"));
  });

  // 🟢 Confirmar → Mostrar popup de éxito
  confirmAccept.addEventListener("click", () => {
    confirmPopup.classList.remove("show");
    successPopup.classList.add("show");

    // Aquí podrías enviar los datos reales al backend con fetch() si lo deseas
  });

  // ❌ Cerrar popup de éxito manualmente + redirección
  successClose.addEventListener("click", () => {
    successPopup.classList.remove("show");
    window.location.href = "/frontend/public/views/admin-pages/products.html";
  });

  // 🔄 Cerrar si se hace clic fuera o sobre el popup
  window.addEventListener("click", (e) => {
    if (e.target === confirmPopup) confirmPopup.classList.remove("show");
    if (e.target === successPopup) {
      successPopup.classList.remove("show");
      window.location.href = "/frontend/public/views/admin-pages/products.html";
    }
  });

  // 🖱️ Cerrar también al hacer clic dentro del popup
  [confirmPopup, successPopup].forEach(popup => {
    popup.addEventListener("click", () => {
      popup.classList.remove("show");
      if (popup === successPopup) {
        window.location.href = "/frontend/public/views/admin-pages/products.html";
      }
    });
  });
}
