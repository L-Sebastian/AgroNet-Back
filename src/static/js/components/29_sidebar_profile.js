async function cargarMensaje() {
  const contenedor = document.querySelector(".sidebar-profile");

  const res = await fetch("/frontend/public/views/components/29_sidebar_profile.html");
  const html = await res.text();

  const div = document.createElement("div");
  div.innerHTML = html;
  contenedor.appendChild(div);

  //  Espera a que el sidebar esté cargado y aplica el comportamiento de "activo"
  activarSidebarLinks(div);
}

// Función que agrega el comportamiento de selección activa
function activarSidebarLinks(rootElement) {
  const menuLinks = rootElement.querySelectorAll(".sidebar__menu a");

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Quita "active" de todos los enlaces
      menuLinks.forEach(l => l.classList.remove("active"));
      // Agrega "active" solo al enlace clicado
      link.classList.add("active");
    });
  });
}

cargarMensaje();
