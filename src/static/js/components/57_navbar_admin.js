document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.querySelector(".navbar-admin-container");

  if (navbarContainer) {
    fetch("/frontend/public/views/components/57_navbar_admin.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar el navbar del admin");
        return response.text();
      })
      .then(data => {
        navbarContainer.innerHTML = data;

        // Cargar CSS dinámicamente
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/frontend/public/css/components/57_navbar_admin.css";
        document.head.appendChild(link);
      })
      .catch(error => console.error(error));
  }
});
