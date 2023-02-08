// Animação plugins - @origamid
  if(window.SimpleAnime){
    new SimpleAnime();
  }

  function initAnimacaoScroll() {
    const sections = document.querySelectorAll(".js-scroll");
  
    if (sections.length) {
      const windowMetade = window.innerHeight * 0.6;
  
      function animaScroll() {
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          const isSectionVisible = sectionTop - windowMetade < 0;
          if (isSectionVisible) section.classList.add("ativo");
          else section.classList.remove("ativo");
        });
      }
      animaScroll(); // exibir a 1° section
  
      window.addEventListener("scroll", animaScroll);
    }
  }
  initAnimacaoScroll();