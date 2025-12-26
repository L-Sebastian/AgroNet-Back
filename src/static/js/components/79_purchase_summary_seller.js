document.addEventListener("DOMContentLoaded", () => {

  // 🛒 DATOS SIMULADOS DEL CARRITO
  const cartData = [
    {
      vendor: "AgroJuan",
      phone: "3001234567",
      payment: "Nequi: 3001234567",
      products: [
        { name: "Tomates", qty: 2, price: 8000 },
        { name: "Papa criolla", qty: 1, price: 5000 }
      ]
    },
    {
      vendor: "CampoDulce",
      phone: "3217654321",
      payment: "Bancolombia: 12345",
      products: [
        { name: "Miel pura", qty: 1, price: 18000 }
      ]
    },
    {
      vendor: "FruverCampo",
      phone: "3123647824",
      payment: "Daviplata: 12345",
      products: [
        { name: "Tomate de arbol", qty: 3, price: 15000 }
      ]
    }
  ];

  // 🎯 CARGAR COMPONENTE HTML
  const container = document.querySelector(".checkout-summary-container");

  if (container) {
    fetch("/frontend/public/views/components/79_purchase_summary_seller.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        // ✅ Renderizar datos y configurar eventos después de cargar el HTML
        renderSummary(cartData);
        initPopups();
      });
  }

  // 🧩 FUNCIÓN PARA RENDERIZAR EL RESUMEN
  function renderSummary(data) {
    const vendorsContainer = document.getElementById("summaryVendors");
    const confirmBtn = document.getElementById("confirmOrderBtn");

    if (!vendorsContainer || !confirmBtn) return;

    data.forEach(v => {
      const vendorCard = document.createElement("div");
      vendorCard.className = "checkout-summary__vendor-card";

      vendorCard.innerHTML = `
        <h3 class="checkout-summary__vendor-name">${v.vendor}</h3>
        <ul class="checkout-summary__product-list">
          ${v.products.map(p => `
            <li class="checkout-summary__product-item">
              ${p.qty}x ${p.name} - $${p.price}
            </li>
          `).join("")}
        </ul>
        <p class="checkout-summary__contact-info"><strong>WhatsApp:</strong> ${v.phone}</p>
        <p class="checkout-summary__contact-info"><strong>Pago:</strong> ${v.payment}</p>
      `;

      vendorsContainer.appendChild(vendorCard);
    });

    // ✅ Abrir popup de confirmación al hacer clic en "Confirmar pedido"
    confirmBtn.addEventListener("click", () => {
      document.getElementById("confirm_order_popup").classList.add("show");
    });
  }

  // 🧠 --- FUNCIÓN PARA INICIALIZAR POPUPS ---
  function initPopups() {
    const confirmPopup = document.getElementById("confirm_order_popup");
    const successPopup = document.getElementById("success_order_popup");

    if (!confirmPopup || !successPopup) return;

    const closeConfirm = confirmPopup.querySelector(".close-popup");
    const cancelBtn = confirmPopup.querySelector(".btn.cancel");
    const acceptBtn = confirmPopup.querySelector(".btn.accept");
    const confirmContent = confirmPopup.querySelector(".popup-content");
    const successContent = successPopup.querySelector(".popup-content");

    // 🟠 Cerrar confirmación (X, cancelar o clic fuera)
    [closeConfirm, cancelBtn].forEach(btn => {
      btn.addEventListener("click", () => {
        confirmPopup.classList.remove("show");
      });
    });

    confirmPopup.addEventListener("click", e => {
      if (e.target === confirmPopup) confirmPopup.classList.remove("show");
    });

    // 🔵 NUEVO: cerrar al hacer clic dentro del cuadro del popup
    confirmContent.addEventListener("click", () => {
      confirmPopup.classList.remove("show");
    });

    // 🟢 Aceptar pedido → mostrar popup de éxito
    acceptBtn.addEventListener("click", () => {
      confirmPopup.classList.remove("show");
      successPopup.classList.add("show");
    });

    // --- POPUP ÉXITO ---
    const closeSuccess = successPopup.querySelector(".close-popup");

    closeSuccess.addEventListener("click", () => {
      successPopup.classList.remove("show");
      window.location.href = "/frontend/public/views/seller-pages/historial_orders.html"; //  Redirigir al cerrar
    });

    successPopup.addEventListener("click", e => {
      if (e.target === successPopup) {
        successPopup.classList.remove("show");
        window.location.href = "/frontend/public/views/seller-pages/historial_orders.html";
      }
    });

    // 🔵 NUEVO: cerrar también al hacer clic dentro del cuadro del popup de éxito
    successContent.addEventListener("click", () => {
      successPopup.classList.remove("show");
      window.location.href = "/frontend/public/views/seller-pages/historial_orders.html";
    });
  }
});
