document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".store-profile-container");

  if (container) {
    fetch("/frontend/public/views/components/37_profile_store.html")
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
        initStoreProfile();
      })
      .catch(error => console.error("Error loading store profile:", error));
  }
});

function initStoreProfile() {
  const btnEditDescription = document.getElementById("btn-edit-description");
  const descriptionText = document.getElementById("store-description");
  const btnAddPayment = document.getElementById("btn-add-payment");
  const paymentList = document.getElementById("payment-list");


  // Add new payment method
  btnAddPayment.addEventListener("click", () => {
    const newPayment = prompt("Ingresa un nuevo método de pago:");
    if (newPayment && newPayment.trim() !== "") {
      const li = document.createElement("li");
      li.classList.add("store-profile__payment-item");
      li.textContent = "" + newPayment.trim();
      paymentList.appendChild(li);
    }
  });
}
