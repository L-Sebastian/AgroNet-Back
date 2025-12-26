class FormPost extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Importar template del HTML externo
    fetch("/frontend/public/views/components/16_create_product.html")
      .then((res) => res.text())
      .then((html) => {
        const templateContainer = document.createElement("div");
        templateContainer.innerHTML = html;

        const template = templateContainer.querySelector("template");
        const content = template.content.cloneNode(true);
        shadow.appendChild(content);

        // CSS
        const linkStyle = document.createElement("link");
        linkStyle.rel = "stylesheet";
        linkStyle.href = "/frontend/public/css/components/16_create_product.css";
        shadow.appendChild(linkStyle);

        // Font Awesome
        const linkFA = document.createElement("link");
        linkFA.rel = "stylesheet";
        linkFA.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        shadow.appendChild(linkFA);

        // ============================
        // Dropdowns personalizados
        // ============================
        const dropdowns = shadow.querySelectorAll(".dropdown");
        dropdowns.forEach((dropdown) => {
          const trigger = dropdown.querySelector(".dropdown__trigger");
          const options = dropdown.querySelectorAll(".dropdown__option");
          const select = dropdown.querySelector("select.hidden-select");
          const optionsBox = dropdown.querySelector(".dropdown__options");

          if (trigger && select) {
            trigger.addEventListener("click", () => {
              const open = optionsBox.style.display === "flex";
              optionsBox.style.display = open ? "none" : "flex";
            });

            options.forEach((opt) => {
              opt.addEventListener("click", () => {
                trigger.querySelector("span").textContent = opt.textContent;
                select.value = opt.dataset.value;
                optionsBox.style.display = "none";
              });
            });

            shadow.addEventListener("click", (e) => {
              if (!dropdown.contains(e.target)) optionsBox.style.display = "none";
            });
          }
        });

        // ============================
        // Modal de éxito
        // ============================
        const modal = shadow.querySelector("#success_modal");
        const modalContent = shadow.querySelector(".modal-content");
        const closeBtn = shadow.querySelector("#close_success");
        const registerBtn = shadow.querySelector(".opinions__btn-publish_product");

        if (registerBtn && modal && closeBtn && modalContent) {
          // Mostrar modal
          registerBtn.addEventListener("click", () => {
            modal.style.display = "flex";
          });

          // Cerrar con la X
          closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            window.location.href = "/frontend/public/views/seller-pages/my_products.html"; // ← redirige
          });

          // Cerrar al hacer clic fuera o dentro del modal
          modal.addEventListener("click", () => {
            modal.style.display = "none";
            window.location.href = "/frontend/public/views/seller-pages/my_products.html"; // ← redirige
          });

          // Evitar cierre si se hace clic dentro del contenido
          modalContent.addEventListener("click", (e) => e.stopPropagation());
          // Nuevo: también cerrar y redirigir si se hace clic en el popup
          modalContent.addEventListener("click", () => {
            modal.style.display = "none";
            window.location.href = "/frontend/public/views/seller-pages/my_products.html"; // cambia esta ruta si deseas
          });
        } else {
          console.error("No se encontró el modal o los botones dentro del Shadow DOM");
        }
      })
      .catch((err) => console.error("Error cargando el componente:", err));
  }
}

// Registrar el componente
customElements.define("form-post", FormPost);





