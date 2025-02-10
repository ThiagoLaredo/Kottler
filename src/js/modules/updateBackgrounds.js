export function updateBackgrounds() {
    document.querySelectorAll(".slide-background, .slide-mask").forEach((el) => {
      let imgName = el.getAttribute("data-bg");
      let screenWidth = window.innerWidth;
      let imageSize = "480w";
  
      if (screenWidth > 1200) {
        imageSize = "1620w";
      } else if (screenWidth > 600) {
        imageSize = "1024w";
      }
  
      let imageUrl = `./img/index/${imgName}-${imageSize}.webp`;
      el.style.backgroundImage = `url('${imageUrl}')`;
    });
  }
  