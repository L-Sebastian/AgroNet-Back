class FormEdit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.loadTemplate();
  }

  async loadTemplate() {
    try {
      const res = await fetch("/src/templates/components/63_edit_product.html");
      const html = await res.text();
      const template = document.createElement("div");
      template.innerHTML = html;

      const content = template.querySelector("template").content.cloneNode(true);

      const linkStyle = document.createElement("link");
      linkStyle.rel = "stylesheet";
      linkStyle.href = "/src/static/css/components/63_edit_product.css";

      const linkFA = document.createElement("link");
      linkFA.rel = "stylesheet";
      linkFA.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";

      this.shadowRoot.append(linkStyle, linkFA, content);

      setTimeout(() => {
        this.initDropdowns();
        this.initModals();
      }, 150);
    } catch (error) {
      console.error("Error al cargar el componente FormEdit:", error);
    }
  }

  // ==========================
  // 🔹 MENÚS DESPLEGABLES
  // ==========================
  initDropdowns() {
    const shadow = this.shadowRoot;
    const dropdowns = shadow.querySelectorAll(".dropdown-edit");

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".dropdown-edit__trigger");
      const optionsBox = dropdown.querySelector(".dropdown-edit__options");
      const options = dropdown.querySelectorAll(".dropdown-edit__option");
      const select = dropdown.parentElement.querySelector("select");

      if (!trigger || !optionsBox || !options.length || !select) return;

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = optionsBox.style.display === "flex";
        optionsBox.style.display = isOpen ? "none" : "flex";
      });

      options.forEach((option) => {
        option.addEventListener("click", () => {
          trigger.querySelector("span").textContent = option.textContent;
          select.value = option.dataset.value;
          optionsBox.style.display = "none";
        });
      });

      window.addEventListener("click", (e) => {
        if (!dropdown.contains(e.composedPath()[0])) {
          optionsBox.style.display = "none";
        }
      });
    });
  }

  // ==========================
  // 🔹 MODALES (Confirmación y Éxito)
  // ==========================
  initModals() {
    const shadow = this.shadowRoot;

    const editBtn = shadow.querySelector(".opinions__btn-edit_product");
    const confirmModal = shadow.getElementById("edit_confirm_popup");
    const successModal = shadow.getElementById("edit_success_modal");

    const cancelBtn = shadow.getElementById("cancel_edit");
    const acceptBtn = shadow.getElementById("accept_edit");
    const closeSuccess = shadow.getElementById("close_edit_success");

    if (!editBtn || !confirmModal || !successModal) {
      console.error(" No se encontraron los elementos del modal dentro del Shadow DOM.");
      return;
    }

    // Mostrar modal de confirmación
    editBtn.addEventListener("click", () => {
      confirmModal.classList.add("show");
    });

    // Cerrar confirmación (clic dentro o fuera)
    cancelBtn.addEventListener("click", () => confirmModal.classList.remove("show"));
    confirmModal.addEventListener("click", (e) => {
      if (e.target === confirmModal || e.target.closest(".modal-content")) {
        confirmModal.classList.remove("show");
      }
    });

    // Aceptar y cerrar confirmación y mostrar éxito
    acceptBtn.addEventListener("click", () => {
      confirmModal.classList.remove("show");
      successModal.classList.add("show");
    });

    // ==========================
    // Solo el modal de ÉXITO redirige
    // ==========================
    const redirectURL = "/src/templates/seller-pages/my_products.html"; // 

    closeSuccess.addEventListener("click", () => {
      successModal.classList.remove("show");
      window.location.href = redirectURL; 
    });

    successModal.addEventListener("click", (e) => {
      if (e.target === successModal || e.target.closest(".modal-content")) {
        successModal.classList.remove("show");
        window.location.href = redirectURL; 
      }
    });
  }
}

customElements.define("form-edit", FormEdit);
