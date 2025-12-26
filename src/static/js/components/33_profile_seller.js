document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".profile-container");
  if (container) {
    fetch("/frontend/public/views/components/33_profile_seller.html")
      .then(res => res.text())
      .then(data => container.innerHTML = data);
  }
});
