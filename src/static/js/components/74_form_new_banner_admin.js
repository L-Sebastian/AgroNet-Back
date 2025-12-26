document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".new-banner-container");

  if (container) {
    fetch("/frontend/public/views/components/74_form_new_banner_admin.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
      })
      .then(() => initNewBannerForm());
  }
});

function initNewBannerForm() {
  const form = document.getElementById("formNuevoBanner");
  const inputFile = document.getElementById("imagen");
  const btnFile = document.getElementById("btnFileBanner");
  const fileText = document.getElementById("fileBannerText");
  const popupSuccess = document.getElementById("banner_success_popup");

  // ✅ Botón para abrir el selector de archivos
  btnFile.addEventListener("click", () => inputFile.click());

  // ✅ Mostrar nombre del archivo seleccionado
  inputFile.addEventListener("change", () => {
    const fileName = inputFile.files.length 
      ? inputFile.files[0].name 
      : "Ningún archivo seleccionado";
    fileText.textContent = fileName;
  });

  // ✅ Envío del formulario con popup
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("/api/banners", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Error al guardar el banner");

      // Mostrar popup de éxito
      popupSuccess.classList.add("show");

    } catch (error) {
      alert("Ocurrió un error al guardar el banner");
    }
  });

  // Cerrar popup al hacer clic en la X, fuera o dentro
  popupSuccess.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("close-popup") ||
      e.target === popupSuccess ||
      e.target.closest(".popup-content")
    ) {
      popupSuccess.classList.remove("show");
      // Redirigir después de cerrar el popup
      window.location.href = "/frontend/public/views/admin-pages/banners.html";
    }
  });
}
