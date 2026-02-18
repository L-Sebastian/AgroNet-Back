document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".orders-profile"); // donde se inyectará el componente

  try {
    //  Cargar el HTML del componente
    // const htmlResponse = await fetch("/frontend/public/views/components/32_historial_orders.html");
    const htmlResponse = await fetch("/src/templates/components/32_historial_orders.html");
    if (!htmlResponse.ok) throw new Error("No se pudo cargar el componente HTML");

    const html = await htmlResponse.text();
    container.insertAdjacentHTML("beforeend", html);

    // Ahora que el componente existe en el DOM, referenciamos sus elementos
    const ordersContainer = document.getElementById("ordersContainer");
    const template = document.getElementById("orderTemplate");

    // Cargar los datos desde JSON
    // const dataResponse = await fetch("/frontend/public/data/orders.json");
    const dataResponse = await fetch("/src/static/data/orders.json");
    if (!dataResponse.ok) throw new Error("No se pudo cargar el archivo JSON");

    const pedidos = await dataResponse.json();

    //Limpiar contenedor antes de insertar
    ordersContainer.innerHTML = "";

    //Generar cada pedido
    pedidos.forEach(pedido => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".order__id").textContent = `Pedido#${pedido.id}`;
      const statusEl = clone.querySelector(".order__status");
      statusEl.textContent = `Estado: ${pedido.estado}`;
      statusEl.classList.add(
        pedido.estado.toLowerCase() === "enviado"
          ? "order__status--enviado"
          : "order__status--pendiente"
      );

      ordersContainer.appendChild(clone);
    });

  } catch (error) {
    console.error("Error al cargar el historial de pedidos:", error);
  }
});

