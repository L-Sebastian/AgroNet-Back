document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.querySelector('.order-container');

  if (contenedor) {
    fetch('/src/templates/components/45_order_detail.html')
      .then(response => response.text())
      .then(data => {
        contenedor.innerHTML = data;

        // 🔹 Inicializar modal después de cargar el componente
        const openBtn = document.getElementById("openInvoice");
        const closeBtn = document.getElementById("closeInvoice");
        const modal = document.getElementById("invoiceModal");

        if (openBtn && closeBtn && modal) {
          openBtn.addEventListener("click", () => {
            modal.classList.add("active");
          });

          closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
          });

          // Cerrar al hacer clic fuera
          modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.classList.contains("invoice-modal__overlay")) {
              modal.classList.remove("active");
            }
          });
        }
      })
      .catch(error => console.error('Error cargando aviso de compra:', error));
  }
});
