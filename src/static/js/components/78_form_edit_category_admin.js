document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-edit-category");

  if (container) {
    fetch("/src/templates/components/78_form_edit_category_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;

        // Esperar a que el formulario se cargue completamente antes de iniciar los popups
        setTimeout(() => initEditCategoryPopups(), 100);
      })
      .catch(error => console.error("Error al cargar el formulario de edición:", error));
  }
});

function initEditCategoryPopups() {
  const form = document.querySelector("#formNuevaCategoria");
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

  // 🟠 Mostrar popup de confirmación al intentar guardar cambios
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmPopup.classList.add("show");
  });

  // 🔴 Cerrar el popup de confirmación sin guardar
  [confirmCancel, confirmClose].forEach(btn => {
    btn.addEventListener("click", () => confirmPopup.classList.remove("show"));
  });

  // 🟢 Al aceptar confirmación → mostrar popup de éxito
  confirmAccept.addEventListener("click", () => {
    confirmPopup.classList.remove("show");
    successPopup.classList.add("show");
  });

  // 🔄 Función para cerrar popup de éxito y redirigir
  function closeSuccessAndRedirect() {
    successPopup.classList.remove("show");
    // 🌐 Redirige a la página deseada
    window.location.href = "/src/templates/admin-pages/categories.html";
  }

  // ❌ Cerrar popup de éxito manualmente con la X
  successClose.addEventListener("click", closeSuccessAndRedirect);

  // 🔄 Cerrar popups si el usuario hace clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === confirmPopup) confirmPopup.classList.remove("show");
    if (e.target === successPopup) closeSuccessAndRedirect();
  });

  // 🧩 Cerrar también al hacer clic dentro del popup de éxito
  successPopup.addEventListener("click", closeSuccessAndRedirect);
}
