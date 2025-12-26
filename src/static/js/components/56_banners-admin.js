document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".admin-view");

  try {
    const htmlResponse = await fetch("/frontend/public/views/components/56_banners-admin.html");
    if (!htmlResponse.ok) throw new Error("No se pudo cargar el componente HTML");

    const html = await htmlResponse.text();
    container.insertAdjacentHTML("beforeend", html);

    const grid = document.querySelector(".admin-banners__grid");

    // Cargar banners desde JSON simulado
    const dataResponse = await fetch("/frontend/public/data/admin_banners.json");
    if (!dataResponse.ok) throw new Error("No se pudo cargar los banners");

    const banners = await dataResponse.json();

    grid.innerHTML = ""; // Limpiar antes de agregar
    banners.forEach(banner => {
      const card = document.createElement("article");
      card.classList.add("banner-card");
      card.innerHTML = `
        <div class="banner-card__image-container">
          <img src="${banner.image}" alt="${banner.name}" class="banner-card__image" />
        </div>
        <div class="banner-card__info">
          <h3 class="banner-card__name">${banner.name}</h3>
          <p class="banner-card__desc">${banner.description}</p>
          <div class="banner-card__actions">
            <button class="banner-card__btn banner-card__btn--edit">Editar</button>
            <button class="banner-card__btn banner-card__btn--delete">Eliminar</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // ================================
    // 🔹 Ventanas emergentes (popups)
    // ================================
    const popupConfirm = document.querySelector("#confirm_delete_popup");
    const popupSuccess = document.querySelector("#delete_success_popup");

    // 🔹 Evento al hacer clic en "Eliminar"
    grid.addEventListener("click", (e) => {
      if (e.target.classList.contains("banner-card__btn--delete")) {
        popupConfirm.classList.add("show");
      }
    });

    // 🔹 Acciones dentro del popup de confirmación
    popupConfirm.addEventListener("click", (e) => {
      if (
        e.target.closest(".close-popup") || // ahora detecta clic en el ícono o su contenedor
        e.target.classList.contains("popup") ||
        e.target.classList.contains("cancel")
      ) {
        popupConfirm.classList.remove("show");
      }

      if (e.target.classList.contains("accept")) {
        popupConfirm.classList.remove("show");
        popupSuccess.classList.add("show");
      }
    });

    // 🔹 Cierre del popup de éxito
    popupSuccess.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("close-popup") || // X
        e.target === popupSuccess ||                  // fondo oscuro
        e.target.closest(".popup-content")            // cualquier parte dentro del popup
      ) {
        popupSuccess.classList.remove("show");
      }
    });

  } catch (error) {
    console.error("Error al cargar los banners:", error);
  }
});
