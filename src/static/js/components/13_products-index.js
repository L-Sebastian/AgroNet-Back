document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".products-index");
  if (container) {
    fetch("/frontend/public/views/components/13_products-index.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
      });
  }
});


