document.addEventListener("DOMContentLoaded", function() {
  const heroElement = document.querySelector(".loginfor-container");

  if (heroElement) {
    fetch("/frontend/public/views/components/6_edit_profile.html")
      .then(response => response.text())
      .then(data => {
        heroElement.innerHTML = data;

        setTimeout(() => {
          const steps = heroElement.querySelectorAll(".form-step");
          const nextBtns = heroElement.querySelectorAll(".next");
          const prevBtns = heroElement.querySelectorAll(".prev");
          const form = heroElement.querySelector("#formRegistro");
          let currentStep = 0;

          const popup = document.getElementById("update_confirm_popup");
          const successModal = document.getElementById("update_success_modal");
          const btnCancel = document.getElementById("update_cancel");
          const btnAccept = document.getElementById("update_accept");
          const btnCloseSuccess = document.getElementById("close_success");

          // Paso inicial
          steps.forEach((step, i) => step.classList.toggle("active", i === currentStep));

          // Botones siguiente
          nextBtns.forEach(btn => {
            btn.addEventListener("click", () => {
              const inputs = steps[currentStep].querySelectorAll("input, select");
              for (let input of inputs) {
                if (!input.checkValidity()) {
                  input.reportValidity();
                  return;
                }
              }
              if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove("active");
                currentStep++;
                steps[currentStep].classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            });
          });

          // Botones atrás
          prevBtns.forEach(btn => {
            btn.addEventListener("click", () => {
              if (currentStep > 0) {
                steps[currentStep].classList.remove("active");
                currentStep--;
                steps[currentStep].classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            });
          });

          // Enviar formulario
          form.addEventListener("submit", e => {
            e.preventDefault();
            popup.style.display = "flex";
          });

          // Cancelar popup
          btnCancel.addEventListener("click", () => {
            popup.style.display = "none";
          });

          // Aceptar y mostrar modal
          btnAccept.addEventListener("click", () => {
            popup.style.display = "none";
            successModal.style.display = "flex";
          });

          // Cerrar modal con la X y redirigir
          btnCloseSuccess.addEventListener("click", () => {
            successModal.style.display = "none";
            window.location.href = "/frontend/public/views/customer-pages/my_profile.html"; //  redirección
          });

          //  Cerrar al hacer clic en cualquier parte del popup
          popup.addEventListener("click", (e) => {
            e.stopPropagation();
            popup.style.display = "none";
          });

          //  Cerrar al hacer clic en cualquier parte del modal de éxito y redirigir
          successModal.addEventListener("click", (e) => {
            e.stopPropagation();
            successModal.style.display = "none";
            window.location.href = "/frontend/public/views/customer-pages/my_profile.html"; //  redirección también aquí
          });

        }, 300);
      })
      .catch(error => console.log("Error al cargar la cuenta:", error));
  }
});
