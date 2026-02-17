document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".admin-categories");

  try {
    const response = await fetch("/src/templates/components/65_admin_categories.html");
    if (!response.ok) throw new Error("No se pudo cargar el componente de categorías");

    const html = await response.text();
    container.innerHTML = html;

    const tableBody = document.querySelector(".admin-categories__body");
    const modal = document.getElementById("categoryModal");
    const modalBody = modal.querySelector(".admin-categories__modal-body");
    const closeModal = modal.querySelector(".admin-categories__btn--close");
    const searchInput = document.querySelector(".admin-categories__search");

    // Datos simulados
    const categories = [
      { nombre: "Animal", descripcion: "Productos derivados de animales", productos: 8 },
      { nombre: "Granos", descripcion: "Legumbres, cereales y semillas naturales", productos: 12 },
      { nombre: "Verduras", descripcion: "Hortalizas frescas y saludables", productos: 15 },
      { nombre: "Frutas", descripcion: "Frutas nacionales y tropicales", productos: 20 },
    ];

    function renderCategories(list) {
      tableBody.innerHTML = "";
      list.forEach((cat, i) => {
        const row = `
          <tr>
            <td>${cat.nombre}</td>
            <td>${cat.descripcion}</td>
            <td>${cat.productos}</td>
            <td>
              <div class="admin-categories__actions-btns">
                <button class="admin-categories__btn admin-categories__btn--view" data-index="${i}">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <a href="/src/templates/admin-pages/form_edit_category.html" class="admin-categories__btn admin-categories__btn--edit" data-index="${i}">
                  <i class="fa-solid fa-pen"></i>
                </a>
                <button class="admin-categories__btn admin-categories__btn--delete" data-index="">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }

    renderCategories(categories);

    // Buscar categoría
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = categories.filter(c =>
        c.nombre.toLowerCase().includes(value) ||
        c.descripcion.toLowerCase().includes(value)
      );
      renderCategories(filtered);
    });

    // Acciones
    tableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const index = btn.dataset.index;
      const category = categories[index];

      if (btn.classList.contains("admin-categories__btn--view")) {
        modalBody.innerHTML = `
          <p><strong>Nombre:</strong> ${category.nombre}</p>
          <p><strong>Descripción:</strong> ${category.descripcion}</p>
          <p><strong>Cantidad de productos:</strong> ${category.productos}</p>
        `;
        modal.style.display = "flex";
      }

      if (btn.classList.contains("admin-categories__btn--edit")) {
        alert(`Editar categoría: ${category.nombre}`);
      }

    });

    // Cerrar modal
    closeModal.addEventListener("click", () => (modal.style.display = "none"));

    // ================================
    // Ventanas emergentes de eliminar
    // ================================
    const popupConfirm = document.getElementById("confirm_delete_popup");
    const popupSuccess = document.getElementById("delete_success_popup");

    // Mostrar popup de confirmación al hacer clic en eliminar
    tableBody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".admin-categories__btn--delete");
      if (deleteBtn) {
        popupConfirm.classList.add("show");
      }
    });

    // Acciones dentro del popup de confirmación
    popupConfirm.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("close-popup") ||
        e.target.classList.contains("cancel") ||
        e.target === popupConfirm || // fondo oscuro
        e.target.closest(".popup-content") // clic dentro
      ) {
        popupConfirm.classList.remove("show");
      }

      if (e.target.classList.contains("accept")) {
        popupConfirm.classList.remove("show");
        popupSuccess.classList.add("show");
      }
    });

    // Cerrar popup de éxito
    popupSuccess.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("close-popup") ||
        e.target === popupSuccess || // fondo oscuro
        e.target.closest(".popup-content") // clic dentro
      ) {
        popupSuccess.classList.remove("show");
      }
    });


  } catch (error) {
    console.error("Error al cargar el componente de categorías:", error);
  }
});
