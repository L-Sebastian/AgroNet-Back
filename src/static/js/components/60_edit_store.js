document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".store-edit-container");

  if (container) {
    fetch("/src/templates/components/60_edit_store.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;

        //  Ejecutar la lógica de los modales DESPUÉS de cargar el HTML
        inicializarModalesStore();
      })
      .catch(error => console.error("Error al cargar el formulario de vendedor:", error));
  }
});

function inicializarModalesStore() {
  const form = document.getElementById("sellerEdit");
  const confirmModal = document.getElementById("store_confirm_popup");
  const successModal = document.getElementById("store_success_modal");

  const cancelBtn = document.getElementById("cancel_store");
  const acceptBtn = document.getElementById("accept_store");
  const closeConfirm = document.getElementById("close_store_confirm");
  const closeSuccess = document.getElementById("close_store_success");

  if (!form || !confirmModal || !successModal) {
    console.error(" No se encontraron los modales o el formulario dentro del HTML cargado.");
    return;
  }

  // 🔹 Mostrar confirmación al enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmModal.classList.add("show");
  });

  // 🔹 Cerrar confirmación
  cancelBtn.addEventListener("click", () => confirmModal.classList.remove("show"));
  closeConfirm.addEventListener("click", () => confirmModal.classList.remove("show"));
  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) confirmModal.classList.remove("show");
  });

  // 🔹 Aceptar → cerrar confirmación y mostrar éxito
  acceptBtn.addEventListener("click", () => {
    confirmModal.classList.remove("show");
    successModal.classList.add("show");
  });

  // 🔹 Cerrar éxito → redirigir
  const redirectURL = "/src/templates/seller-pages/profile_store.html";

  const closeAndRedirect = () => {
    successModal.classList.remove("show");
    window.location.href = redirectURL;
  };

  // Cerrar con la X
  closeSuccess.addEventListener("click", closeAndRedirect);

  // Cerrar con clic fuera o dentro del popup
  successModal.addEventListener("click", (e) => {
    // Se cierra si el clic es en el fondo o dentro del modal (excepto si el clic fue en los elementos internos pequeños como el ícono o texto)
    if (e.target === successModal || e.target.closest(".modal-content")) {
      closeAndRedirect();
    }
  });
}
