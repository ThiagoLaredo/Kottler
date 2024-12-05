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
    gsap.to([".solucao-intro", ".solucoes-intro", ".intro-cases", ".case-titulo"], { duration: 0.5, delay: 2, opacity: 1, ease: "power1.inOut" });

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

        gsap.to('.whatsapp-float', {
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
    sections.forEach(section => {
        const elements = section.querySelectorAll('.animate-me');
        elements.forEach(element => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 50,
                },
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
    });

    // Animação para o círculo que se move para a esquerda
    gsap.to("#circuloEsquerda", {
        scrollTrigger: {
        trigger: "#circuloEsquerda",
        start: "top center", // Ajuste conforme necessário
        end: "bottom top",
        scrub: true,
        },
        x: -100, // Mova 100px para a esquerda
    });
    
    // Animação para o círculo que se move para a direita
    gsap.to("#circuloDireita", {
        scrollTrigger: {
        trigger: "#circuloDireita",
        start: "top center",
        end: "bottom top",
        scrub: true,
        },
        x: 100, // Mova 100px para a direita
    });


    gsap.to(".grade-rosa g", {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".grade-rosa",
          start: "top 80%", // Inicia quando o topo do SVG chega a 80% da altura da viewport
          end: "top 30%", // Termina quando o topo do SVG chega a 30% da altura da viewport
          scrub: true
        }
      });

      gsap.set(".svg-canal-container svg", { opacity: 0, y: -50 }); // Esconde e move para cima

      gsap.to(".svg-canal-container svg", {
       scrollTrigger: {
         trigger: ".svg-canal-container",
         start: "top+=300px",  // Inicia a animação quando o topo do elemento chega ao final da janela
         end: "bottom top",    // Conclui a animação quando a parte inferior do elemento passa pelo topo da janela
         toggleActions: "play none none none",
         markers: false  // Para visualização dos gatilhos
       },
       opacity: 0.3, // Torna visível
       y: 0, // Move para a posição original
       duration: 1, // Duração da animação
       ease: "power1.out" // Efeito de suavização
      });
      

    const numeros = document.querySelectorAll('.numero');
    numeros.forEach(numero => {
        const originalText = numero.innerText; // Captura o texto original
        const hasPlus = originalText.startsWith('+'); // Verifica se começa com '+'
        const endValue = parseInt(numero.getAttribute('data-end-value'), 10);
        const duration = 1; // Definir a duração total da contagem
        const incrementTime = (duration * 1000) / endValue; // Tempo entre os incrementos
        
        let currentValue = 0;
    
        const updateNumber = () => {
            if (currentValue <= endValue) {
                numero.innerText = (hasPlus ? '+' : '') + currentValue; // Adiciona '+' se necessário
                currentValue++;
                setTimeout(updateNumber, incrementTime);
            }
        };
    
        // Usar GSAP para animar a contagem no scroll
        gsap.fromTo(numero, 
            { innerText: 0 }, 
            { 
                innerText: endValue,
                duration: duration,
                ease: 'none',
                scrollTrigger: {
                    trigger: numero,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                    onEnter: updateNumber
                }
            }
        );
    });
   
};

