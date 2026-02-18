document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".banner-container");

  fetch("/src/templates/components/12_banner.html")
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;

      const titles = [
        "COMPRA. VENDE. AYUDA.",
        "APOYA. PRODUCE. CRECE.",
        "CONSUME. LOCAL. AHORA."
      ];

      let index = 0;
      const titleElement = container.querySelector(".banner__title");
      const leftArrow = container.querySelector(".banner__arrow--left");
      const rightArrow = container.querySelector(".banner__arrow--right");

      const changeText = (i) => {
        titleElement.classList.remove("fade-in");
        void titleElement.offsetWidth; // reinicia animación
        titleElement.innerHTML = titles[i].replace(/\./g, ".<br>");
        titleElement.classList.add("fade-in");
      };

      //Cambiar texto automáticamente cada 10 segundos
      let autoChange = setInterval(() => {
        index = (index + 1) % titles.length;
        changeText(index);
      }, 3000);

      //Flechas izquierda y derecha
      const restartAutoChange = () => {
        clearInterval(autoChange);
        autoChange = setInterval(() => {
          index = (index + 1) % titles.length;
          changeText(index);
        }, 10000);
      };

      leftArrow.addEventListener("click", () => {
        index = (index - 1 + titles.length) % titles.length;
        changeText(index);
        restartAutoChange();
      });

      rightArrow.addEventListener("click", () => {
        index = (index + 1) % titles.length;
        changeText(index);
        restartAutoChange();
      });

      // Muestra el primero al cargar
      changeText(index);
    })
    .catch(error => console.error("Error al cargar el banner:", error));
});