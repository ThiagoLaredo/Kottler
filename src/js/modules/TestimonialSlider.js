import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'; 

export default class TestimonialSlider {
  constructor() {
    this.initSwiper();
  }

  initSwiper() {
    // Inicializa o Swiper
    new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next', // Botão "Próximo"
        prevEl: '.swiper-button-prev', // Botão "Anterior"
      },
      slidesPerView: 1, // Exibe um slide por vez
      spaceBetween: 20, // Espaçamento entre os slides
      autoHeight: true, // Ajusta a altura de acordo com o conteúdo dos slides
    });
  }
}
