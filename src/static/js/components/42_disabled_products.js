document.addEventListener("DOMContentLoaded", async () => {
  const containerPage = document.querySelector(".myproductsdisabled");

  // Cargar componente HTML
  if (containerPage) {
    try {
      const response = await fetch("/src/templates/components/42_disabled_products.html");
      const data = await response.text();
      containerPage.insertAdjacentHTML("beforeend", data);

      // Luego de insertar el componente, cargar los datos del JSON
      await loadDisabledProducts();
    } catch (error) {
      console.error("Error al cargar el componente 42_disabled_products:", error);
    }
  }
});

async function loadDisabledProducts() {
  const container = document.getElementById("disabled_products_container");

  try {
    const res = await fetch("/src/static/data/disabled_products.json");
    const productos = await res.json();
    const template = document.getElementById("disabled_product_template");

    productos.forEach((producto) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".disabled-product__image").src = producto.imagen;
      clone.querySelector(".disabled-product__name").textContent = `Nombre del Producto: ${producto.nombre}`;
      clone.querySelector(".disabled-product__price").textContent = `Precio: ${producto.precio}`;
      clone.querySelector(".disabled-product__type").textContent = `Tipo de producto: ${producto.tipo}`;

      const boton = clone.querySelector(".disabled-product__btn");
      boton.addEventListener("click", () => {
        const modal = document.getElementById("enable_success_modal");
        const closeBtn = document.getElementById("close_enable_modal");
        const modalContent = modal.querySelector(".modal-content");

        // Mostrar el modal
        modal.style.display = "flex";

        // Función para cerrar el modal
        const cerrarModal = () => {
          modal.style.display = "none";
        };

        // Cerrar al hacer clic en la X
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          cerrarModal();
        });

        // Cerrar al hacer clic en el fondo o en el popup
        modal.addEventListener("click", cerrarModal);

        // ✅ Ahora también se cierra si se hace clic dentro del contenido
        modalContent.addEventListener("click", cerrarModal);
      });


      container.appendChild(clone);
    });
  } catch (err) {
    console.error("Error al cargar los productos:", err);
  }
}
