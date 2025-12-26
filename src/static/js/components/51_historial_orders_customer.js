document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".orders-customer-profile"); // donde se inyectará el componente

  try {
    //  Cargar el HTML del componente
    const htmlResponse = await fetch("/frontend/public/views/components/51_historial_orders_customer.html");
    if (!htmlResponse.ok) throw new Error("No se pudo cargar el componente HTML");

    const html = await htmlResponse.text();
    container.insertAdjacentHTML("beforeend", html);

    // Ahora que el componente existe en el DOM, referenciamos sus elementos
    const ordersContainer = document.getElementById("customerOrdersContainer");
    const template = document.getElementById("customerOrderTemplate");

    // Cargar los datos desde JSON
    const dataResponse = await fetch("/frontend/public/data/orders.json");
    if (!dataResponse.ok) throw new Error("No se pudo cargar el archivo JSON");

    const pedidos = await dataResponse.json();

    // Limpiar contenedor antes de insertar
    ordersContainer.innerHTML = "";

    // Generar cada pedido
    pedidos.forEach(pedido => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".customer-orders__id").textContent = `Pedido#${pedido.id}`;
      const statusEl = clone.querySelector(".customer-orders__status");
      statusEl.textContent = `Estado: ${pedido.estado}`;
      statusEl.classList.add(
        pedido.estado.toLowerCase() === "enviado"
          ? "customer-orders__status--enviado"
          : "customer-orders__status--pendiente"
      );

      ordersContainer.appendChild(clone);
    });

  } catch (error) {
    console.error("Error al cargar el historial de pedidos:", error);
  }
});
