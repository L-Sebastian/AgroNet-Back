document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-edit-order");

  if (container) {
    fetch("/frontend/public/views/components/77_form_edit_order_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;
        setTimeout(() => initEditOrderPopups(), 100);
      })
      .catch(err => console.error("Error al cargar el formulario:", err));
  }
});

function initEditOrderPopups() {
  const form = document.querySelector("#formDatosPedido");
  const confirmPopup = document.querySelector("#confirm_edit_order_popup");
  const successPopup = document.querySelector("#edit_order_success_popup");

  if (!form || !confirmPopup || !successPopup) {
    console.warn("⚠️ No se encontraron los elementos del formulario o popups.");
    return;
  }

  const confirmAccept = confirmPopup.querySelector(".btn.accept");
  const confirmCancel = confirmPopup.querySelector(".btn.cancel");
  const confirmClose = confirmPopup.querySelector(".close-popup");
  const successClose = successPopup.querySelector(".close-popup");

  // 🟠 Mostrar popup de confirmación al guardar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmPopup.classList.add("show");
  });

  // 🔴 Cerrar popup de confirmación
  [confirmCancel, confirmClose].forEach(btn => {
    btn.addEventListener("click", () => confirmPopup.classList.remove("show"));
  });

  // 🟢 Aceptar confirmación → mostrar popup de éxito
  confirmAccept.addEventListener("click", () => {
    confirmPopup.classList.remove("show");
    successPopup.classList.add("show");
  });

  // 🔁 Cerrar popup de éxito y redirigir
  function closeSuccessAndRedirect() {
    successPopup.classList.remove("show");
    window.location.href = "/frontend/public/views/admin-pages/orders.html";
  }

  // Cerrar con la X
  successClose.addEventListener("click", closeSuccessAndRedirect);

  // Cerrar al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === confirmPopup) confirmPopup.classList.remove("show");
    if (e.target === successPopup) closeSuccessAndRedirect();
  });

  // Cerrar al hacer clic dentro
  successPopup.addEventListener("click", closeSuccessAndRedirect);
}
