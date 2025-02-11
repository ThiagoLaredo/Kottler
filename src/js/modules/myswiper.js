import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

    export class MySwiperSolucoes {
    constructor() {
    this.swiper = null;
    this.initializeSwiper();
    }

    initializeSwiper() {
    const container = document.querySelector('#swiper1');
    if (!container) return;

    console.log('Initializing Swiper Solucoes...');
    this.swiper = new Swiper('#swiper1', {
        modules: [Navigation, Autoplay, Pagination],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
        delay: 2000, // Define o tempo de atraso entre transições automáticas
        disableOnInteraction: false, // Continua o autoplay mesmo após interação do usuário
        },
        pagination: {
            el: '#pagination1',
            clickable: true,
        },
        navigation: {
            nextEl: '#next1',
            prevEl: '#prev1',
        },
    });

    console.log('Solucoes Swiper initialized:', this.swiper);
    }

    }

    export class MySwiperCases {
    constructor() {
    this.swiper = null;
    this.initializeSwiper();
    }

    initializeSwiper() {
    const container = document.querySelector('#swiper2');
    if (!container) return;

    console.log('Initializing Swiper Cases...');
    this.swiper = new Swiper('#swiper2', {
    modules: [Pagination, Navigation],
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '#pagination2',
        clickable: true,
    },
    navigation: {
        nextEl: '#next2',
        prevEl: '#prev2',
    },
    });

    console.log('Caeses Swiper initialized:', this.swiper);
    }
    }