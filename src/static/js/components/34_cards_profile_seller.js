document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".seller-products-container");
  if (container) {
    fetch("/frontend/public/views/components/34_cards_profile_seller.html")
      .then(res => res.text())
      .then(data => container.innerHTML = data);
  }
});
