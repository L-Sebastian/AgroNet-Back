document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".admin-view");

  try {
    const response = await fetch("/src/templates/components/61_admin_users.html");
    if (!response.ok) throw new Error("No se pudo cargar el componente de usuarios");

    const html = await response.text();
    container.innerHTML = html;

    const tableBody = document.querySelector(".admin-users__body");
    const modal = document.getElementById("userModal");
    const modalBody = modal.querySelector(".admin-users__modal-body");
    const closeModal = modal.querySelector(".admin-users__btn--close");
    const searchInput = document.querySelector(".admin-users__search");

    // ✅ Datos simulados de usuarios (con 2 campos nuevos)
    const users = [
      { nombre: "Juan", apellido: "Pérez", usuario: "jperez", telefono: "3111234567", correo: "juanperez@mail.com", tipo_doc: "CC", numero: "123456789", direccion: "Calle 10 #15-30", departamento: "Risaralda", municipio: "Pereira", tipo_usuario: "Administrador", fecha_nac: "1995-05-20" },
      { nombre: "María", apellido: "Gómez", usuario: "mgomez", telefono: "3109876543", correo: "mariagomez@mail.com", tipo_doc: "CC", numero: "987654321", direccion: "Cra 5 #25-10", departamento: "Antioquia", municipio: "Medellín", tipo_usuario: "Cliente", fecha_nac: "1998-03-11" },
      { nombre: "Andrés", apellido: "Ruiz", usuario: "aruiz", telefono: "3124567890", correo: "andresruiz@mail.com", tipo_doc: "CC", numero: "1029384756", direccion: "Av 3 #40-22", departamento: "Cundinamarca", municipio: "Bogotá", tipo_usuario: "Vendedor", fecha_nac: "1990-10-02" },
      { nombre: "Sofía", apellido: "Martínez", usuario: "smartinez", telefono: "3209988776", correo: "sofia@mail.com", tipo_doc: "TI", numero: "345678912", direccion: "Cl 8 #12-20", departamento: "Valle", municipio: "Cali", tipo_usuario: "Cliente", fecha_nac: "2002-09-15" },
      { nombre: "Camilo", apellido: "Castro", usuario: "ccastro", telefono: "3005566778", correo: "camilo@mail.com", tipo_doc: "CC", numero: "556677889", direccion: "Cl 20 #8-30", departamento: "Tolima", municipio: "Ibagué", tipo_usuario: "Vendedor", fecha_nac: "1997-01-25" },
      { nombre: "Laura", apellido: "Vargas", usuario: "lvargas", telefono: "3012233445", correo: "laura@mail.com", tipo_doc: "CC", numero: "223344556", direccion: "Cra 45 #12-10", departamento: "Santander", municipio: "Bucaramanga", tipo_usuario: "Cliente", fecha_nac: "2000-07-14" },
      { nombre: "David", apellido: "Morales", usuario: "dmorales", telefono: "3217788990", correo: "david@mail.com", tipo_doc: "CE", numero: "445566778", direccion: "Av 9 #22-44", departamento: "Atlántico", municipio: "Barranquilla", tipo_usuario: "Administrador", fecha_nac: "1992-04-18" },
      { nombre: "Valentina", apellido: "Torres", usuario: "vtorres", telefono: "3029988776", correo: "valentina@mail.com", tipo_doc: "CC", numero: "667788990", direccion: "Cl 15 #9-12", departamento: "Risaralda", municipio: "Dosquebradas", tipo_usuario: "Cliente", fecha_nac: "2001-11-03" }
    ];

    // ✅ Render tabla actualizada
    const renderUsers = (list) => {
      tableBody.innerHTML = "";
      list.forEach((user, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.nombre}</td>
          <td>${user.apellido}</td>
          <td>${user.usuario}</td>
          <td>${user.telefono}</td>
          <td>${user.correo}</td>
          <td>${user.tipo_doc}</td>
          <td>${user.numero}</td>
          <td>${user.direccion}</td>
          <td>${user.departamento}</td>
          <td>${user.municipio}</td>
          <td>${user.tipo_usuario}</td>
          <td>${user.fecha_nac}</td>
          <td class="admin-users__actions-btns">
            <button class="admin-users__btn admin-users__btn--view" data-index="${i}"><i class="fa-solid fa-eye"></i></button>
            <a href="/src/templates/admin-pages/form_edit_user.html" class="admin-users__btn admin-users__btn--edit"><i class="fa-solid fa-pen"></i></a>
            <button class="admin-users__btn admin-users__btn--delete" data-index="${i}"><i class="fa-solid fa-xmark"></i></button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    };

    renderUsers(users);

    // ✅ Búsqueda incluye tipos de usuario y fecha
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = users.filter(u =>
        u.nombre.toLowerCase().includes(value) ||
        u.apellido.toLowerCase().includes(value) ||
        u.usuario.toLowerCase().includes(value) ||
        u.correo.toLowerCase().includes(value) ||
        u.tipo_usuario.toLowerCase().includes(value)
      );
      renderUsers(filtered);
    });

    // ✅ Abrir modal con nuevos campos
    tableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const index = btn.dataset.index;
      const user = users[index];

      if (btn.classList.contains("admin-users__btn--view")) {
        modalBody.innerHTML = `
          <p><strong>Nombre:</strong> ${user.nombre} ${user.apellido}</p>
          <p><strong>Usuario:</strong> ${user.usuario}</p>
          <p><strong>Correo:</strong> ${user.correo}</p>
          <p><strong>Teléfono:</strong> ${user.telefono}</p>
          <p><strong>Dirección:</strong> ${user.direccion}</p>
          <p><strong>Departamento:</strong> ${user.departamento}</p>
          <p><strong>Municipio:</strong> ${user.municipio}</p>
          <p><strong>Tipo de usuario:</strong> ${user.tipo_usuario}</p>
          <p><strong>Fecha de nacimiento:</strong> ${user.fecha_nac}</p>
          <p><strong>Tipo de documento:</strong> ${user.tipo_doc}</p>
          <p><strong>Numero de documento:</strong> ${user.numero}</p>
        `;
        modal.style.display = "flex";
      }
    });

    closeModal.addEventListener("click", () => (modal.style.display = "none"));

  } catch (error) {
    console.error("Error al cargar el componente de usuarios:", error);
  }
});
