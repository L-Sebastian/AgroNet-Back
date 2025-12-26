document.addEventListener("DOMContentLoaded", function() {
    const emptyCartElement = document.querySelector(".empty-cart-container");

    if (emptyCartElement) {
        fetch("/frontend/public/views/components/41_cart_general.html")
        .then(response => response.text())
        .then(data => {
            emptyCartElement.innerHTML = data;
        })
        .catch(error => console.log("Error al cargar el componente Empty Cart", error));
    }
});
