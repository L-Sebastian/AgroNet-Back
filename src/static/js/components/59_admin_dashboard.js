document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".admin-view");

  fetch("/frontend/public/views/components/59_admin_dashboard.html")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar el dashboard");
      return response.text();
    })
    .then(html => {
      // Insertamos el HTML del componente
      container.innerHTML = html;

      // Esperamos a que el HTML se inserte y luego seleccionamos el canvas
      const ctx = document.getElementById("salesChart");
      if (!ctx) {
        console.error("No se encontró el canvas para la gráfica");
        return;
      }

      // Creamos la gráfica
      const chart = new Chart(ctx, {
        type: "bar", // Puedes usar "line", "pie", etc.
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          datasets: [{
            label: "Registros en la pagina",
            data: [120, 190, 300, 250, 280, 350],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#333",
                font: { size: 13, weight: "500" }
              },
              grid: { color: "#eee" }
            },
            x: {
              ticks: { color: "#333" },
              grid: { color: "#fafafa" }
            }
          },
          plugins: {
            legend: { display: true, labels: { color: "#444" } },
            tooltip: { backgroundColor: "#fff", titleColor: "#000", bodyColor: "#333" }
          }
        }
      });
    })
    .catch(error => console.error("Error cargando el dashboard:", error));
});
