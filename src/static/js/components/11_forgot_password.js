document.addEventListener("DOMContentLoaded", function() {
  const heroElement = document.querySelector(".recover-container");

  if (heroElement) {
    fetch("/src/templates/components/11_forgot_password.html")
      .then(response => response.text())
      .then(data => {
        heroElement.innerHTML = data;
        initRecoverForm();
      })
      .catch(error =>
        console.log("Error al cargar el formulario de recuperación:", error)
      );
  }
});

function initRecoverForm() {
  const form = document.querySelector(".recover__form");
  const popup = document.querySelector(".recover-popup");

  if (!form || !popup) return;

  const closeBtn = popup.querySelector(".recover-popup__close");

  // Abrir popup
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    setTimeout(() => {
      popup.classList.add("show");
    }, 200);
  });

  // Cerrar popup
  popup.addEventListener("click", (e) => {
    const clickedOverlay = e.target.classList.contains("recover-popup");
    const clickedClose = e.target.closest(".recover-popup__close");

    if (clickedOverlay || clickedClose) {
      popup.classList.remove("show");

      setTimeout(() => {
        window.location.href = "/src/templates/pages-general/token_forgot_password.html";
      }, 250);
    }
  });
}
