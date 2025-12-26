document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".admin-orders");

  try {
    const res = await fetch("/frontend/public/views/components/64_admin_order.html");
    if (!res.ok) throw new Error("Error al cargar el componente de pedidos");
    const html = await res.text();
    container.innerHTML = html;

    const tableBody = document.querySelector(".admin-orders__body");
    const modal = document.getElementById("orderModal");
    const modalBody = modal.querySelector(".popup-body");
    const closeModal = modal.querySelector(".close-popup");
    const searchInput = document.querySelector(".admin-orders__search");

    const confirmPopup = document.getElementById("confirm_delete_popup");
    const successPopup = document.getElementById("delete_success_popup");

    const orders = [
      { id: 1001, cliente: "Juan Pérez", fecha: "2025-10-25", estado: "Pendiente", total: 45000, pago: "Efectivo", direccion: "Calle 10 #15-30" },
      { id: 1002, cliente: "María Gómez", fecha: "2025-10-20", estado: "Enviado", total: 82000, pago: "Tarjeta", direccion: "Cra 5 #25-10" },
      { id: 1003, cliente: "Andrés Ruiz", fecha: "2025-10-18", estado: "Entregado", total: 23000, pago: "Transferencia", direccion: "Av 3 #40-22" },
      { id: 1004, cliente: "Sofía Martínez", fecha: "2025-10-15", estado: "Cancelado", total: 18000, pago: "Efectivo", direccion: "Cl 8 #12-20" },
    ];

    function renderOrders(list) {
      tableBody.innerHTML = "";
      list.forEach((order, i) => {
        const row = `
          <tr>
            <td>${order.id}</td>
            <td>${order.cliente}</td>
            <td>${order.fecha}</td>
            <td>${order.estado}</td>
            <td>$${order.total.toLocaleString()}</td>
            <td>${order.pago}</td>
            <td>${order.direccion}</td>
            <td>
              <div class="admin-orders__actions-btns">
                <button class="admin-orders__btn admin-orders__btn--view" data-index="${i}">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <a href="/frontend/public/views/admin-pages/form_edit_order.html" class="admin-orders__btn admin-orders__btn--edit" data-index="${i}">
                  <i class="fa-solid fa-pen"></i>
                </a>
                <button class="admin-orders__btn admin-orders__btn--delete" data-index="${i}">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }

    renderOrders(orders);

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = orders.filter(o =>
        o.cliente.toLowerCase().includes(value) ||
        o.estado.toLowerCase().includes(value) ||
        o.pago.toLowerCase().includes(value)
      );
      renderOrders(filtered);
    });

    tableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const index = btn.dataset.index;
      const order = orders[index];

      if (btn.classList.contains("admin-orders__btn--view")) {
        modalBody.innerHTML = `
          <p><strong>ID Pedido:</strong> ${order.id}</p>
          <p><strong>Cliente:</strong> ${order.cliente}</p>
          <p><strong>Fecha:</strong> ${order.fecha}</p>
          <p><strong>Estado:</strong> ${order.estado}</p>
          <p><strong>Total:</strong> $${order.total.toLocaleString()}</p>
          <p><strong>Método de pago:</strong> ${order.pago}</p>
          <p><strong>Dirección:</strong> ${order.direccion}</p>
        `;
        modal.classList.add("show");
      }

      if (btn.classList.contains("admin-orders__btn--delete")) {
        confirmPopup.classList.add("show");

        const cancelBtn = confirmPopup.querySelector(".btn.cancel");
        const acceptBtn = confirmPopup.querySelector(".btn.accept");

        cancelBtn.onclick = () => confirmPopup.classList.remove("show");
        acceptBtn.onclick = () => {
          confirmPopup.classList.remove("show");
          successPopup.classList.add("show");
        };
      }
    });

    // Cerrar modales al hacer clic
    // Cerrar popups (modal, confirmación y éxito)
    [modal, confirmPopup, successPopup].forEach(popup => {
      popup.addEventListener("click", (e) => {
        const clickedPopup = e.target.classList.contains("popup");
        const clickedClose = e.target.closest(".close-popup");
        const clickedContent = e.target.closest(".popup-content");

        // Si el usuario hace clic fuera del contenido o en la "X" → cerrar
        if (clickedPopup || clickedClose) {
          popup.classList.remove("show");
        }

        // 🔹 Si el usuario hace clic DENTRO del popup (en cualquier parte visible)
        // solo cerrar para el popup de éxito
        if (popup.id === "delete_success_popup" && clickedContent) {
          popup.classList.remove("show");
        }
      });
    });

  } catch (err) {
    console.error("Error al cargar pedidos:", err);
  }
});
