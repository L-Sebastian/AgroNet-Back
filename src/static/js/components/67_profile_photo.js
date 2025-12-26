document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container-profile-photo");

  // Cargar el HTML del componente
  const res = await fetch("/frontend/public/views/components/67_profile_photo.html");
  const html = await res.text();
  const div = document.createElement("div");
  div.innerHTML = html;
  const template = div.querySelector("#template-profile-photo");
  container.appendChild(template.content.cloneNode(true));

  const grid = document.querySelector(".profile-photo-grid");

  // Cargar las fotos del JSON
  const resJSON = await fetch("/frontend/public/data/profile_photo.json");
  const photos = await resJSON.json();

  photos.forEach((photo) => {
    const card = document.createElement("div");
    card.classList.add("profile-photo-card");

    card.innerHTML = `
      <img src="${photo.url}" alt="${photo.name}" class="profile-photo-card__img" />
      <div class="profile-photo-card__body">
        <h3 class="profile-photo-card__title">${photo.name}</h3>
        <div class="profile-photo-card__buttons">
          <button class="btn-select" data-id="${photo.id}">Seleccionar</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Referencias al modal
  const modal = document.getElementById("photo_modal");
  const closeModal = document.getElementById("close_photo_modal");
  const cancelBtn = document.getElementById("cancel_photo");
  const acceptBtn = document.getElementById("accept_photo");
  const modalText = document.getElementById("photo_modal_text");
  let selectedPhoto = null;

  // Escuchar clicks en “Seleccionar”
  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-select")) {
      const id = e.target.dataset.id;
      selectedPhoto = photos.find((p) => p.id == id);

      // Mostrar modal con el nombre de la foto
      modalText.textContent = `¿Deseas establecer "${selectedPhoto.name}" como tu foto de perfil?`;
      modal.style.display = "flex";
    }
  });

  // Cerrar modal
  const close = () => (modal.style.display = "none");
  closeModal.addEventListener("click", close);
  cancelBtn.addEventListener("click", close);

  // Confirmar selección
  acceptBtn.addEventListener("click", () => {
    if (selectedPhoto) {
      // Marcar la seleccionada visualmente
      document.querySelectorAll(".btn-select").forEach((btn) => {
        btn.textContent = "Seleccionar";
        btn.classList.remove("btn-selected");
      });

      const selectedBtn = document.querySelector(`[data-id="${selectedPhoto.id}"]`);
      selectedBtn.textContent = "Seleccionado";
      selectedBtn.classList.add("btn-selected");
    }

    close();
  });

  // Cerrar al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
});
