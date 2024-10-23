
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export const initPageOpenAnimations = () => {
    gsap.set([".header", "[data-menu='logo']", "[data-menu='button']", "#menu > li > a", "#menu > li > span", ".social-icons-header a", ".img-circulo", ".introducao-texto h1"], { opacity: 0 });

    gsap.to(".header", { duration: 1, opacity: 1, ease: "power1.inOut" });
    gsap.to("[data-menu='logo']", { duration: 1, delay: 0.3, opacity: 1, ease: "power1.inOut" });
    gsap.to("[data-menu='button']", { duration: 1, delay: 0.5, opacity: 1, ease: "power1.inOut" });

    // Anima apenas os links e spans de primeiro nível, incluindo o <span>Serviços</span>
    gsap.to("#menu > li > a, #menu > li > span", { 
        duration: 0.1, 
        delay: 0.7, 
        opacity: 1, 
        stagger: 0.2, 
        ease: "power1.out" 
    });

    gsap.to(".social-icons-header a", { duration: 0.5, delay: 1.2, opacity: 1, stagger: 0.2, ease: "power1.inOut" });

    const h1 = document.querySelector('.wave-text');
    if (h1) {
        h1.innerHTML = h1.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
        gsap.set(h1, { opacity: 1 });
    }

    const introducao = document.querySelector(".introducao");
    if (introducao) {
        gsap.fromTo(introducao, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0
        }, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => introducao.style.clipPath = 'none'
        });
    }

    const imgCirculo = document.querySelector(".img-circulo");
    if (imgCirculo) {
        gsap.to(imgCirculo, {
            duration: 1,
            delay: 0.8,
            opacity: 0.5,
            scale: 1,
            ease: "back.out(1.7)"
        });
    }

    // Animação condicional da .programa__badge
    const badge = document.querySelector('.programa__badge');
    if (badge) {
        gsap.fromTo(badge, 
          { opacity: 0, y: -20 }, 
          { opacity: 1, y: 0, duration: 0.7, ease: "power1.out", delay: 1.5 }
        );
    }

    const waveTextSpans = document.querySelectorAll(".introducao-texto h1 span");
    if (waveTextSpans.length > 0) {
        gsap.from(waveTextSpans, {
            duration: 0.3,
            opacity: 0,
            ease: "power1.inOut",
            y: -20,
            stagger: {
                each: 0.03,
                from: "start",
                yoyo: true,
                repeat: 0
            },
            delay: 1
        });
    }
};

export const initScrollAnimations = () => {
    const sections = document.querySelectorAll('section, footer');

    sections.forEach(section => {
      // Seleciona todas as divs com a classe .depoimento-card
      const depoimentoCards = section.querySelectorAll('.depoimento-card');
    
      // Se houver .depoimento-card dentro da seção, anima a div inteira
      if (depoimentoCards.length > 0) {
        depoimentoCards.forEach(card => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "bottom 100%",
              toggleActions: "play none none none",
              markers: false
            },
            duration: 0.7,   // Duração para a animação da div inteira
            opacity: 0,
            y: 20,
            ease: "power1.out"
          });
        });
      }
    
      // Anima os outros elementos internos, mas exclui os que estão dentro da .depoimento-card
      const elementsToAnimate = section.querySelectorAll(
        'h2, p, img, h3, h4, ul, ol, li, a, .empresa-badge, .voce-badge, .programa__circle, button, #contact-form, #send-button'
      );
    
      // Filtra os elementos para garantir que os dentro de .depoimento-card sejam excluídos
      const elementsToAnimateFiltered = Array.from(elementsToAnimate).filter(el => {
        return !el.closest('.depoimento-card');
      });
    
      // Anima apenas os elementos que não estão dentro de .depoimento-card
      if (elementsToAnimateFiltered.length > 0) {
        gsap.from(elementsToAnimateFiltered, {
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 100%",
            toggleActions: "play none none none",
            markers: false
          },
          duration: 0.5,
          opacity: 0,
          y: 20,
          stagger: 0.2,
          ease: "power1.out"
        });
      }
    });
    

  document.querySelectorAll('.circle-lilas, .circle-lilas-escuro').forEach(circle => {
      gsap.from(circle, {
          scrollTrigger: {
              trigger: circle,
              start: "top 90%",
              end: "top 50%",
              toggleActions: "play none none none"
          },
          opacity: 0,
          duration: 0.7
      });
  });

  document.querySelectorAll(".highlight").forEach(element => {
      gsap.to(element, {
          scrollTrigger: {
              trigger: element,
              start: "top center",
              toggleActions: "play none none none",
              markers: false
          },
          duration: 2,
          width: "100%",
          ease: "none",
          repeat: 0,
          yoyo: false
      });
  });

  const gradeCircles = document.querySelectorAll('.grade-footer circle'); // Seleciona todos os círculos do SVG

  if (gradeCircles.length > 0) {
    gsap.fromTo(gradeCircles, {
      opacity: 0,  // Começa com opacidade 0 (invisível)
    }, {
      opacity: 1,  // Anima para opacidade 1 (visível)
      stagger: {
        each: 0.003,  // Aparece um círculo a cada 0.05 segundos
        from: "end",  // Anima de cima para baixo
      },
      duration: 0.1,  // Duração de cada animação
      ease: "power2.out",  // Animação suave, rápida
      scrollTrigger: {
        trigger: '.grade-footer',  // Gatilho para iniciar a animação ao fazer scroll até o SVG
        start: "top 80%",  // Inicia quando o topo do SVG estiver 80% na viewport
        toggleActions: "play none none none"  // Executa uma vez e mantém a animação
      }
    });
  }
};











