// ============================
//  Componente <my-products>
// ============================
class MyProducts extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    fetch("/src/templates/components/17_component_my_products.html")
      .then(res => res.text())
      .then(html => {
        const template = document.createElement("div");
        template.innerHTML = html;
        const content = template.querySelector("template").content.cloneNode(true);

        const styleLink = document.createElement("link");
        styleLink.setAttribute("rel", "stylesheet");
        styleLink.setAttribute("href", "/src/static/css/components/17_my_products.css");

        const faLink = document.createElement("link");
        faLink.setAttribute("rel", "stylesheet");
        faLink.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

        shadow.appendChild(styleLink);
        shadow.appendChild(faLink);
        shadow.appendChild(content);

        this.renderProducts(shadow);
        this.setupDropdown(shadow);
        this.setupMenuCard(shadow);
        this.setupPopupClose(shadow); //  nuevo método para manejar el cierre del popup
        this.setupPopupActions(shadow); //  NUEVO: manejo completo de eventos de cierre
        this.setupDisablePopup(shadow); 
        this.setupDetailsPopup(shadow); 
      });
  }

  renderProducts(shadow) {
    const products = [
      { name: "Manzana Gala", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/manzanagala.jpg" },
      { name: "Banano", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/huevos.jpg" },
      { name: "Banano", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/cebolla_larga.jpg" },
      { name: "Banano", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/lechuga.jpg"},
      { name: "Banano", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/papa.jpg" },
      { name: "Banano", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/platano.webp" },
      { name: "Banano", price: "$20 por kg", type: "fruta", stock: "24kg", image: "/frontend/public/assets/cafe.jpg" },
      { name: "Naranja", price: "$1.390 por und", type: "fruta", stock: "24kg", image: "/frontend/public/assets/banano.webp" }
    ];

    const container = shadow.querySelector(".products__grid");

    products.forEach((p, index) => {
      const card = document.createElement("article");
      card.classList.add("product-card");
      const checkboxId = `checkboxInput-${index}`;

      card.innerHTML = `
        <div class="menu-card">
          <button class="menu-card__toggle"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          <ul class="menu-card__options">
            <li class="menu-card__item">Publicar</li>
            <li class="menu-card__item">Editar</li>
            <li class="menu-card__item">Visualizar</li>
            <li class="menu-card__item">Ver detalles</li>
            <li class="menu-card__item">Deshabilitar</li>
          </ul>
        </div>

        <img class="product-card__img" src="${p.image}" alt="${p.name}">
        <div class="product-card__info">
          <h3 class="product-card__name">Nombre del Producto: ${p.name}</h3>
          <p class="product-card__price">Precio: ${p.price}</p>
          <p class="product-card__type">Tipo de producto: <span>${p.type}</span></p>
          <p class="product-card__stock">Stock: <span>${p.stock}</span></p>

          <div class="product-card__toggle">
            <input type="checkbox" id="${checkboxId}">
            <label for="${checkboxId}" class="toggleSwitch"></label>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  setupDropdown(shadow) {
    const toggle = shadow.querySelector(".dropdown__toggle");
    const menu = shadow.querySelector(".dropdown__menu");

    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    shadow.addEventListener("click", (e) => {
      if (!shadow.contains(e.target)) {
        menu.classList.remove("show");
      }
    });

    menu.querySelectorAll(".dropdown__item").forEach(item => {
      item.addEventListener("click", () => {
        console.log("Filtro seleccionado:", item.dataset.filter);
        menu.classList.remove("show");
      });
    });
  }

  setupMenuCard(shadow) {
    shadow.addEventListener("click", (e) => {
      const toggle = e.composedPath().find(el => el.classList && el.classList.contains("menu-card__toggle"));
      const allMenus = shadow.querySelectorAll(".menu-card__options");
      if (!toggle) return;
      e.stopPropagation();
      const currentMenu = toggle.nextElementSibling;
      allMenus.forEach(m => {
        if (m !== currentMenu) m.classList.remove("show");
      });
      currentMenu.classList.toggle("show");
    });

    // Editar
    shadow.addEventListener("click", (e) => {
      const editItem = e.composedPath().find(el => el.classList && el.classList.contains("menu-card__item") && el.textContent.trim() === "Editar");
      if (editItem) {
        window.location.href = "/src/templates/seller-pages/edit_product.html";
      }
    });

    //  Visualizar
    shadow.addEventListener("click", (e) => {
      const editItem = e.composedPath().find(el => el.classList && el.classList.contains("menu-card__item") && el.textContent.trim() === "Visualizar");
      if (editItem) {
        window.location.href = "/src/templates/seller-pages/product_seller.html";
      }
    });

    // Publicar, Mostrar popup
    shadow.addEventListener("click", (e) => {
      const publishItem = e.composedPath().find(
        el => el.classList && el.classList.contains("menu-card__item") && el.textContent.trim() === "Publicar"
      );

      if (publishItem) {
        // Cierra todos los menús antes de mostrar el popup
        shadow.querySelectorAll(".menu-card__options").forEach(menu => menu.classList.remove("show"));

        // Muestra el popup
        const popup = shadow.querySelector("#publish_success_popup");
        if (popup) popup.classList.add("show");
      }
      // Deshabilitar → Mostrar confirmación
      shadow.addEventListener("click", (e) => {
        const disableItem = e.composedPath().find(
          el => el.classList && el.classList.contains("menu-card__item") && el.textContent.trim() === "Deshabilitar"
        );

        if (disableItem) {
          // Cierra los menús
          shadow.querySelectorAll(".menu-card__options").forEach(menu => menu.classList.remove("show"));

          // Muestra popup de confirmación
          const confirmPopup = shadow.querySelector("#disable_confirm_popup");
          if (confirmPopup) confirmPopup.classList.add("show");
        }
      });
    });

    // Cierra menús si se hace clic fuera
    window.addEventListener("click", (e) => {
      const path = e.composedPath();
      const clickedInsideShadow = path.some(el => el === shadow.host || el.shadowRoot === shadow);
      const clickedMenu = path.some(el => el.classList && (el.classList.contains("menu-card__toggle") || el.classList.contains("menu-card__options")));
      if (!clickedInsideShadow || !clickedMenu) {
        shadow.querySelectorAll(".menu-card__options").forEach(menu => menu.classList.remove("show"));
      }
    });
  }

  // Cierra el popup dentro del shadowRoot (por clic general)
  setupPopupClose(shadow) {
    const popup = shadow.querySelector("#publish_success_popup");
    if (!popup) return;

    popup.addEventListener("click", (e) => {
      const isClose = e.target.classList.contains("close-popup") || e.target.classList.contains("popup");
      if (isClose) {
        popup.classList.remove("show");
      }
    });
  }

  // NUEVO: Maneja el clic específico en la X o en el contenido
  setupPopupActions(shadow) {
    const popup = shadow.querySelector("#publish_success_popup");
    const closeBtn = shadow.querySelector(".close-popup");
    if (!popup || !closeBtn) return;

    // Cerrar al hacer clic en la X
    closeBtn.addEventListener("click", () => popup.classList.remove("show"));

    // Cerrar al hacer clic en cualquier parte del popup (fondo)
    popup.addEventListener("click", () => {
      popup.classList.remove("show");
    });
  }

  // NUEVO: Maneja la deshabilitación con confirmación
  // Maneja la deshabilitación con confirmación y popup de éxito
  setupDisablePopup(shadow) {
    const confirmPopup = shadow.querySelector("#disable_confirm_popup");
    const successPopup = shadow.querySelector("#disable_success_popup");
    if (!confirmPopup || !successPopup) return;

    const btnAccept = confirmPopup.querySelector(".btn.accept");
    const btnCancel = confirmPopup.querySelector(".btn.cancel");
    const closeBtns = confirmPopup.querySelectorAll(".close-popup");

    // Cerrar confirmación (por X o Cancelar)
    closeBtns.forEach(btn =>
      btn.addEventListener("click", () => confirmPopup.classList.remove("show"))
    );
    if (btnCancel) btnCancel.addEventListener("click", () => confirmPopup.classList.remove("show"));

    // Aceptar → cerrar confirmación y mostrar éxito
    if (btnAccept) {
      btnAccept.addEventListener("click", () => {
        confirmPopup.classList.remove("show");
        successPopup.classList.add("show");
      });
    }

    // Cerrar popup de éxito (clic en la X, el fondo o el contenido)
    const successCloseBtn = successPopup.querySelector(".close-popup");

    // Cerrar con la X
    if (successCloseBtn) {
      successCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        successPopup.classList.remove("show");
      });
    }

    // Cerrar al hacer clic en cualquier parte del popup (fondo o contenido)
    successPopup.addEventListener("click", () => {
      successPopup.classList.remove("show");
    });
  }

  // NUEVO: Maneja el popup de detalles del producto
  setupDetailsPopup(shadow) {
    const popup = shadow.querySelector("#details_popup");
    if (!popup) return;

    // Detectar clic en "Ver detalles"
    shadow.addEventListener("click", (e) => {
      const detailsItem = e.composedPath().find(
        el => el.classList && el.classList.contains("menu-card__item") && el.textContent.trim() === "Ver detalles"
      );

      if (detailsItem) {
        // Cierra todos los menús
        shadow.querySelectorAll(".menu-card__options").forEach(menu => menu.classList.remove("show"));

        // Buscar la tarjeta del producto clickeada
        const card = detailsItem.closest(".product-card");
        if (!card) return;

        // Obtener la información del producto
        const name = card.querySelector(".product-card__name")?.textContent.replace("Nombre del Producto: ", "") || "";
        const type = card.querySelector(".product-card__type span")?.textContent || "";
        const price = card.querySelector(".product-card__price")?.textContent.replace("Precio: ", "") || "";
        const stock = card.querySelector(".product-card__stock span")?.textContent || "";

        // Asignar valores al popup
        shadow.querySelector("#detail-name").textContent = name;
        shadow.querySelector("#detail-type").textContent = type;
        shadow.querySelector("#detail-price").textContent = price;
        shadow.querySelector("#detail-stock").textContent = stock;

        // Valores extra (puedes cambiarlos si tienes más datos)
        shadow.querySelector("#detail-unit").textContent = "$10.000";
        shadow.querySelector("#detail-description").textContent = "Producto fresco de alta calidad.";
        shadow.querySelector("#detail-unit-weight").textContent = "Kilogramos";
        shadow.querySelector("#detail-weight").textContent = "24 kg";

        // Mostrar popup
        popup.classList.add("show");
      }
    });

    // Cerrar al hacer clic en la X, el fondo o cualquier parte
    const closeBtn = popup.querySelector(".close-popup");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        popup.classList.remove("show");
      });
    }

    popup.addEventListener("click", () => {
      popup.classList.remove("show");
    });
  }

}

customElements.define("my-products", MyProducts);
