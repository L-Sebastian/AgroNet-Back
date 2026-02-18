document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.querySelector('#summary__product__container');

  if (contenedor) {
    fetch('/src/templates/components/9_summary.html')      
    .then(response => response.text())
      .then(data => {
        contenedor.innerHTML = data;
      })
      .catch(error => console.error('Error cargando resumen-producto:', error));
  }
});
