import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export const initPageOpenAnimations = () => {

    // Define os elementos que terão animações de abertura com a classe 'page-open-animate'
    const pageOpenElements = document.querySelectorAll(".page-open-animate");
    gsap.set(pageOpenElements, { opacity: 0 });

    gsap.to(pageOpenElements, {
        opacity: 1,
        duration: 0.5,
        delay: 2,
        stagger: 0.2, // Animação com um pequeno atraso entre os elementos
        ease: "power1.inOut",
    });

    gsap.set([".contact-info", ".social-instagram a", ".header", "[data-menu='logo']", "[data-menu='button']", "#menu > li > a", "#menu > li > span", ".solucoes-intro", ".solucao-intro", ".intro-cases", ".case-titulo"], { opacity: 0 });

    gsap.to(".header", { duration: 0.1, opacity: 1, ease: "power1.inOut" });
    gsap.to(".contact-info", { duration: 0.5, delay: 0.1, opacity: 1, ease: "power1.inOut" });
    gsap.to(".social-instagram a", { duration: 0.5, delay: 0.2, opacity: 1, ease: "power1.inOut" });
    gsap.to("[data-menu='logo']", { duration: 0.5, delay: 0.3, opacity: 1, ease: "power1.inOut" });
    gsap.to("[data-menu='button']", { duration: 0.5, delay: 0.4, opacity: 1, ease: "power1.inOut" });
    gsap.to([".solucao-intro", ".solucoes-intro", ".intro-cases", ".case-titulo"], { duration: 0.5, delay: 2, opacity: 1, ease: "power1.inOut", });
    
    // Anima apenas os links e spans de primeiro nível, incluindo o <span>Serviços</span>
    gsap.to("#menu > li > a, #menu > li > span", { 
        duration: 0.5, 
        delay: 0.8, 
        opacity: 1, 
        stagger: 0.2, 
        ease: "power1.out" 
    });

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

        // Animação para o botão com a classe 'btn'
    const btn = document.querySelectorAll(".btn");
    btn.forEach(button => {
        button.addEventListener("mouseenter", () => {
            gsap.to(button, {
                duration: 0.3,
                backgroundColor: "var(--textwhite)", // Cor escurecida
                color: "var(--primary)", // Cor do texto
                scale: 1.05
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                duration: 0.3,
                backgroundColor: "", // Volta à cor original
                color: "", // Volta à cor original
                scale: 1
            });
        });
    });

        // Verifique se está na página `index.html`
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
          const coluna1 = document.querySelector('.coluna-1');
          const coluna2 = document.querySelector('.coluna-2');
      
          if (coluna1 && coluna2) {
            const screenWidth = window.innerWidth;
            const fullWidth = coluna1.scrollWidth;
      
            gsap.fromTo(
              coluna1,
              { x: `-${fullWidth - screenWidth / 2}px` },
              {
                x: '0%',
                ease: 'none',
                repeat: -1,
                duration: 20,
                modifiers: {
                  x: gsap.utils.unitize(x => parseFloat(x) % fullWidth)
                }
              }
            );
      
            gsap.to(coluna2, {
              x: '-100%',
              modifiers: {
                x: gsap.utils.unitize(x =>
                  parseFloat(x) %
                  parseFloat(window.getComputedStyle(coluna2).width)
                )
              },
              repeat: -1,
              duration: 20,
              ease: 'none'
            });
          }
        }

        gsap.to('.whatsapp-button', {
            scale: 1.1, // aumenta o tamanho do ícone
            duration: 0.6, // duração da animação
            repeat: -1, // repete infinitamente
            yoyo: true, // volta ao estado inicial para um efeito suave de pulsar
            ease: 'power1.inOut' // suaviza a entrada e saída da animação
          });          
};

export const initScrollAnimations = () => {
  // Seleciona todas as sections e o footer, exceto a introdução
  const sections = document.querySelectorAll('section:not(.introducao), footer');
  if (sections.length > 0) {
      sections.forEach(section => {
          const elements = section.querySelectorAll('.animate-me');
          if (elements.length > 0) {
              elements.forEach(element => {
                  gsap.fromTo(
                      element,
                      { opacity: 0, y: 50 },
                      {
                          scrollTrigger: {
                              trigger: element,
                              start: "top 80%",
                              end: "bottom 20%",
                              toggleActions: "play none none none",
                          },
                          opacity: 1,
                          y: 0,
                          duration: 1,
                          ease: "power1.out",
                      }
                  );
              });
          } else {
              console.warn("Nenhum elemento .animate-me encontrado dentro de uma section ou footer.");
          }
      });
  } else {
      console.warn("Nenhuma section ou footer (exceto .introducao) foi encontrada.");
  }

  // Animação para o círculo que se move para a esquerda
  const circuloEsquerda = document.querySelector("#circuloEsquerda");
  if (circuloEsquerda) {
      gsap.to(circuloEsquerda, {
          scrollTrigger: {
              trigger: circuloEsquerda,
              start: "top center", 
              end: "bottom top",
              scrub: true,
          },
          x: -100, 
      });
  } else {
      console.warn("#circuloEsquerda não encontrado.");
  }

  // Animação para o círculo que se move para a direita
  const circuloDireita = document.querySelector("#circuloDireita");
  if (circuloDireita) {
      gsap.to(circuloDireita, {
          scrollTrigger: {
              trigger: circuloDireita,
              start: "top center",
              end: "bottom top",
              scrub: true,
          },
          x: 100, 
      });
  } else {
      console.warn("#circuloDireita não encontrado.");
  }

  // Animação do grade-rosa g
  const gradeRosaElement = document.querySelector(".grade-rosa g");
  if (gradeRosaElement) {
      gsap.to(".grade-rosa g", {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".grade-rosa",
            start: "top 80%", 
            end: "top 30%",
            scrub: true
          }
      });
  } else {
      console.warn("Nenhum elemento '.grade-rosa g' encontrado.");
  }

  // Animação svg-canal-container
  const svgCanal = document.querySelector(".svg-canal-container svg");
  if (svgCanal) {
      gsap.set(svgCanal, { opacity: 0, y: -50 });

      gsap.to(svgCanal, {
          scrollTrigger: {
            trigger: ".svg-canal-container",
            start: "top+=300px",
            end: "bottom top",
            toggleActions: "play none none none",
            markers: false
          },
          opacity: 0.3,
          y: 0,
          duration: 1,
          ease: "power1.out"
      });
  } else {
      console.warn("Nenhum SVG encontrado dentro de '.svg-canal-container'.");
  }

  // Linha da timeline
  const line = document.querySelector(".timeline-line line");
  if (line) {
      const lineLength = line.getTotalLength();
      
      gsap.set(line, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      });
    
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
  } else {
      console.warn("A linha SVG da timeline não foi encontrada. A animação da linha não será executada.");
  }

  // Itens da timeline
  const timelineItems = gsap.utils.toArray(".timeline-item");
  if (timelineItems.length > 0) {
      timelineItems.forEach((item, i) => {
        const marker = item.querySelector(".timeline-marker");
        const content = item.querySelector(".timeline-content");
    
        if (!marker || !content) {
          console.warn(`O marcador ou conteúdo está ausente no item de índice ${i}.`);
          return;
        }
    
        gsap.fromTo(
          marker,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
    
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
  } else {
      console.warn("Nenhum item de timeline foi encontrado. A animação dos marcadores e conteúdos não será executada.");
  }
    
  // Animação dos números
  const numeros = document.querySelectorAll('.numero');
  if (numeros.length > 0) {
    numeros.forEach(numero => {
        const originalText = numero.innerText; 
        const hasPlus = originalText.startsWith('+');
        const endValue = parseInt(numero.getAttribute('data-end-value'), 10);

        if (isNaN(endValue)) {
            console.warn(`O elemento .numero não possui um data-end-value válido:`, numero);
            return;
        }

        const duration = 1; 
        const incrementTime = (duration * 1000) / endValue;
        
        let currentValue = 0;
        const updateNumber = () => {
            if (currentValue <= endValue) {
                numero.innerText = (hasPlus ? '+' : '') + currentValue;
                currentValue++;
                setTimeout(updateNumber, incrementTime);
            }
        };
        
        gsap.from(numero, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: numero,
            start: 'top 80%',
            onEnter: () => {
              updateNumber();
            }
          }
        });
    });
  } else {
    console.warn("Nenhum elemento com a classe .numero foi encontrado. A animação de contagem não será executada.");
  }
};