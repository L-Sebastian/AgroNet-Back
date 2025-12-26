document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('container__component');

  if (contenedor) {
    fetch('/frontend/public/views/components/7_product_cart.html')
      .then(res => res.text())
      .then(html => {
        contenedor.innerHTML = html;
      })
      .catch(err => console.error('Error al cargar el producto:', err));
  }
});