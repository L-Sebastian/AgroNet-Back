document.addEventListener("DOMContentLoaded", async () => {
  const containerPage = document.querySelector(".myaddressbook");

  // Cargar componente HTML
  if (containerPage) {
    try {
      const response = await fetch("/frontend/public/views/components/46_address_book.html");
      const data = await response.text();
      containerPage.insertAdjacentHTML("beforeend", data);

      // Luego de insertar el componente, cargar los datos del JSON
      await loadDisabledProducts();
    } catch (error) {
      console.error("Error al cargar el componente 46_address_book:", error);
    }
  }
});

async function loadDisabledProducts() {
  const container = document.getElementById("disabled_products_container2");

  try {
    const res = await fetch("/frontend/public/data/address_book.json");
    const productos = await res.json();
    const template = document.getElementById("disabled_product_template2");

    container.innerHTML = ""; // limpiar antes de insertar

    productos.forEach((producto) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".disabled-product__name2").textContent = producto.usuario;
      clone.querySelector(".disabled-product__price2").textContent = producto.nombre;
      clone.querySelector(".disabled-product__mail2").textContent = producto.correo;
      clone.querySelector(".disabled-product__type2").textContent = producto.telefono;

      container.appendChild(clone);
    });

    // Mostrar/ocultar menú de opciones
    const optionButtons = container.querySelectorAll(".options-btn");
    optionButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const menu = btn.parentElement.querySelector(".options-menu");

        // Cerrar otros menús
        document.querySelectorAll(".options-menu").forEach((m) => {
          if (m !== menu) m.style.display = "none";
        });

        // Alternar visibilidad
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      });
    });

    // Acción para "Visualizar perfil"
    container.querySelectorAll(".view-profile").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const usuario = productos[index].usuario;
        window.location.href = `/frontend/public/views/seller-pages/customer-profile.html?usuario=${encodeURIComponent(usuario)}`;
      });
    });

    // ✅ Acción para "Eliminar contacto" con popup y modal de éxito
    container.querySelectorAll(".delete-contact").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const popup = document.getElementById("delete_popup");
        const successModal = document.getElementById("delete_success_modal");
        const cancelBtn = document.getElementById("delete_cancel");
        const acceptBtn = document.getElementById("delete_accept");
        const closeSuccess = successModal.querySelector(".close");

        // Mostrar popup de confirmación
        popup.style.display = "flex";

        // Cancelar eliminación
        cancelBtn.onclick = () => {
          popup.style.display = "none";
        };

        // Aceptar eliminación
        acceptBtn.onclick = () => {
          popup.style.display = "none";

          // Eliminar la card del DOM
          const card = btn.closest(".disabled-product__card2");
          if (card) card.remove();

          // Mostrar modal de éxito
          successModal.style.display = "flex";

          // Cerrar modal al hacer clic en la X o fuera
          closeSuccess.onclick = () => (successModal.style.display = "none");
          successModal.addEventListener("click", (e) => {
            if (e.target === successModal) successModal.style.display = "none";
          });
          successModal.addEventListener("click", (e) => {
            // Si el clic fue en el fondo o dentro del modal-content, ciérralo
            if (e.target === successModal || e.target.closest(".modal-content")) {
              successModal.style.display = "none";
            }
          });
        };
      });
    });

    // Cerrar menú al hacer clic fuera (solo un listener)
    document.addEventListener("click", () => {
      document.querySelectorAll(".options-menu").forEach((m) => (m.style.display = "none"));
    });

  } catch (err) {
    console.error("Error al cargar los productos:", err);
  }
}
