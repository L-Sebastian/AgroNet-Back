document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container-form-category");

  if (container) {
    fetch("/src/templates/components/72_form_new_category_admin.html")
      .then(res => res.text())
      .then(component => {
        container.innerHTML = component;

        const form = document.querySelector("#formNuevaCategoria");
        const popup = document.getElementById("success_category_popup");

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          popup.classList.add("show");
        });

        // Cerrar popup y redirigir
        popup.addEventListener("click", (e) => {
          if (
            e.target.classList.contains("popup") || 
            e.target.closest(".close-popup") || 
            e.target.closest(".popup-content") // clic dentro del contenido también
          ) {
            popup.classList.remove("show");
            // Redirigir después de cerrar
            window.location.href = "/src/templates/admin-pages/categories.html";
          }
        });
      });
  }
});
