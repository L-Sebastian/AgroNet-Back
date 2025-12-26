document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".dropdown");

  if (!container) return;

  try {
    //Cargar categorías desde JSON
    const response = await fetch("/frontend/public/data/categories.json");
    if (!response.ok) {
      throw new Error("Error al cargar categorías");
    }

    const categories = await response.json();

    // Generamos dinámicamente los <li>
    const itemsHTML = categories
      .map(cat => `<li class="dropdown__item">${cat}</li>`)
      .join("");

    // Renderizamos el componente
    container.innerHTML = `
      <button class="dropdown__button" id="dropdown-btn">
        <span class="dropdown__text"><em>Categoría</em></span>
        <i class="fa-solid fa-chevron-down dropdown__icon"></i>
      </button>
      <ul class="dropdown__list" id="dropdown-list">
        ${itemsHTML}
      </ul>
    `;

    const dropdownBtn = container.querySelector("#dropdown-btn");
    const items = container.querySelectorAll(".dropdown__item");

    // Mostrar / ocultar lista
    dropdownBtn.addEventListener("click", () => {
      container.classList.toggle("show");
    });

    // Cerrar cuando selecciona un item
    items.forEach(item => {
      item.addEventListener("click", () => {
        container.classList.remove("show");
      });
    });

    // Cerrar si hace clic afuera
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove("show");
      }
    });
  } catch (error) {
    console.error("Hubo un problema cargando las categorías:", error);
    container.innerHTML = `<p style="color:red">No se pudieron cargar las categorías.</p>`;
  }
});
