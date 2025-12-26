document.addEventListener("DOMContentLoaded", function() {
  const heroElement = document.querySelector(".loginforgot-container");

  if (heroElement) {
    fetch("/frontend/public/views/components/4_form_new__account.html")
      .then(response => response.text())
      .then(data => {
        heroElement.innerHTML = data;

        // 🧩 Esperar un pequeño momento para asegurar carga del HTML
        setTimeout(() => {
          const steps = heroElement.querySelectorAll(".form-step");
          const nextBtns = heroElement.querySelectorAll(".next");
          const prevBtns = heroElement.querySelectorAll(".prev");
          const form = heroElement.querySelector("#formRegistro");
          let currentStep = 0;

          // Asegurar que el primer paso esté activo
          steps.forEach((step, i) => {
            step.classList.toggle("active", i === currentStep);
          });

        nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const inputs = steps[currentStep].querySelectorAll("input, select");

            // Valida todos los campos del paso actual
            for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity(); //  muestra el mensaje nativo del navegador
                return; // Detiene el avance hasta que se corrija
            }
            }

            // Si todo está bien, avanza
            if (currentStep < steps.length - 1) {
            steps[currentStep].classList.remove("active");
            currentStep++;
            steps[currentStep].classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
        });

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

          form.addEventListener("submit", e => {
            e.preventDefault();
            // alert("Cuenta creada con éxito!");
          });
        }, 300); // Espera 0.3s para garantizar que el HTML cargó
      })
      .catch(error => console.log("Error al cargar la cuenta:", error));
  }
});



