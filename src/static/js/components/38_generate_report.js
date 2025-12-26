document.addEventListener("DOMContentLoaded", function() {
  const heroElement = document.querySelector(".report-profile");

  if (heroElement) {
    fetch("/frontend/public/views/components/38_generate_report.html")
      .then(response => response.text())
      .then(data => {
        heroElement.innerHTML = data;

        setTimeout(() => {
          const form = document.getElementById("report-form");
          const popup = document.getElementById("report_confirm_popup");
          const modal = document.getElementById("report_success_modal");
          const btnCancel = document.getElementById("report_cancel");
          const btnAccept = document.getElementById("report_accept");
          const btnClose = document.getElementById("close_success");

          if (!form) return;

          // Mostrar popup al enviar el formulario
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            popup.style.display = "flex";
          });

          // Cancelar popup
          btnCancel.addEventListener("click", () => {
            popup.style.display = "none";
          });

          // Aceptar envío
          btnAccept.addEventListener("click", () => {
            popup.style.display = "none";
            modal.style.display = "flex";
          });

          // Cerrar modal con la X
          btnClose.addEventListener("click", () => {
            modal.style.display = "none";
            window.location.href = "/frontend/public/views/customer-pages/generate_report.html";
          });

          // ✅ Cerrar popup al hacer clic en cualquier parte
          popup.addEventListener("click", () => {
            popup.style.display = "none";
          });

          // ✅ Cerrar modal al hacer clic en cualquier parte
          modal.addEventListener("click", () => {
            modal.style.display = "none";
            window.location.href = "/frontend/public/views/customer-pages/generate_report.html";
          });
        }, 200);
      })
      .catch(error => console.log("Error al cargar el reporte:", error));
  }
});
