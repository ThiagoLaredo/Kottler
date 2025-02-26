export function updateBackgrounds() {
  const elements = document.querySelectorAll(".slide-background, .slide-mask");

  const loadImage = (el) => {
    let imgName = el.getAttribute("data-bg");
    if (!imgName) return;

    let screenWidth = window.innerWidth;
    let imageSize = "480w";

    if (screenWidth > 1200) {
      imageSize = "1620w";
    } else if (screenWidth > 600) {
      imageSize = "1024w";
    }

    let imageUrl = `./img/index/${imgName}-${imageSize}.webp`;
    el.style.backgroundImage = `url('${imageUrl}')`;
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target); // Para de observar depois de carregar a imagem
      }
    });
  });

  elements.forEach((el) => observer.observe(el));

  // Atualiza imagens ao redimensionar a tela
  window.addEventListener("resize", () => {
    elements.forEach((el) => loadImage(el));
  });
}
