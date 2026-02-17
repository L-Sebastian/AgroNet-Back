document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".seller-form-container");
  if (container) {
    fetch("/src/templates/components/36_seller_form.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;

        // Referencias
        const form = container.querySelector("#sellerForm");
        const modal = container.querySelector("#modal");
        const closeBtn = container.querySelector(".close");
        const modalContent = container.querySelector(".modal-content");

        // Mostrar modal al enviar formulario
        form.addEventListener("submit", (e) => {
          e.preventDefault(); // Evita redirección automática
          modal.style.display = "flex";
        });

        //  Cerrar modal al hacer clic en la X
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });

        //  Cerrar modal al hacer clic fuera del contenido
        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });

        // Al hacer clic en el contenido →redirigir
        modalContent.addEventListener("click", () => {
          modal.style.display = "none";
          window.location.href = "/src/templates/seller-pages/profile_store.html";
        });
      })
      .catch(error => console.error("Error al cargar el formulario de vendedor:", error));
  }
});
