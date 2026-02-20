document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".token-container");

  if (container) {
    fetch("/src/templates/components/82_token_forgot_password.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        const inputs = container.querySelectorAll(".token__input");
        const form = container.querySelector(".token__form");
        const resendLink = container.querySelector(".token__resend-link");
        const popup = container.querySelector(".popup--token-success");

        //Autoenfoque entre inputs
        inputs.forEach((input, index) => {
          input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
              inputs[index - 1].focus();
            }
          });
        });


        // Mostrar popup al hacer clic en “Reenviar código”
        resendLink.addEventListener("click", (e) => {
          e.preventDefault();
          if (popup) popup.classList.add("show");
        });

        // Cerrar popup al hacer clic fuera o en la X
        if (popup) {
          popup.addEventListener("click", (e) => {
            if (
              e.target.classList.contains("popup") || 
              e.target.closest(".popup__close") 
            ) {
              popup.classList.remove("show");

            }
          });
        }
      })
      .catch((error) =>
        console.error("Error al cargar el componente de token:", error)
      );
  }
});
