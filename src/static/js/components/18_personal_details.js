async function cargarDatos() {
  const contenedor = document.querySelector(".contact-container");

  const res = await fetch("/frontend/public/views/components/18_personal_details.html");   // tu archivo con el formulario de datos personales
  const html = await res.text();

  const div = document.createElement("div");
  div.innerHTML = html;
  contenedor.appendChild(div);
}

cargarDatos();
