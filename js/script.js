import { bubbleValues } from "./info/bubbleValues.js";

// Animação plugins - @origamid
if (window.SimpleAnime) {
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

const optimizedBubbleValues = bubbleValues.map(
  ([size, distance, position, time, delay]) => ({
    size,
    distance,
    position,
    time,
    delay,
  })
);

const containerBuble = document.querySelector(".bubbles");
optimizedBubbleValues.forEach((array) => {
  const elemento = document.createElement("div");
  elemento.classList.add("bubble");
  elemento.style.setProperty("--size", array.size);
  elemento.style.setProperty("--distance", array.distance);
  elemento.style.setProperty("--position", array.position);
  elemento.style.setProperty("--time", array.time);
  elemento.style.setProperty("--delay", array.delay);
  containerBuble.appendChild(elemento);
});

/*
const array = new Array(100).fill(null);
array.forEach(() => {
  const primeiroNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  const segundoNum = Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000;
  const resultadoFinal = `${primeiroNum}.${segundoNum}`
});
*/

document.addEventListener("DOMContentLoaded", function () {
  this.addEventListener("click", (e) => {
    let tar = e.target;
    if (tar.hasAttribute("data-dl")) {
      let dlClass = "dl-working";
      if (!tar.classList.contains(dlClass)) {
        let lastSpan = tar.querySelector("span:last-child"),
          lastSpanText = lastSpan.textContent,
          timeout = getMSFromProperty("--dur", ":root");

        tar.classList.add(dlClass);
        lastSpan.textContent = "Downloading…";
        tar.disabled = true;

        setTimeout(() => {
          lastSpan.textContent = "Completed!";
        }, timeout * 0.9);

        setTimeout(() => {
          tar.classList.remove(dlClass);
          lastSpan.textContent = lastSpanText;
          tar.disabled = false;
        }, timeout + 1e3);
      }
    }
  });
});
function getMSFromProperty(property, selector) {
  let cs = window.getComputedStyle(document.querySelector(selector)),
    transDur = cs.getPropertyValue(property),
    msLabelPos = transDur.indexOf("ms"),
    sLabelPos = transDur.indexOf("s");

  if (msLabelPos > -1) {
    return transDur.slice(0, msLabelPos);
  } else if (sLabelPos > -1) {
    return transDur.slice(0, sLabelPos) * 1e3;
  }
}

function prefersColorScheme() {
  const elementoHtml = document.querySelector("html");
  let prefersColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const botaoDark = document.getElementById("toggle-dark");
  botaoDark.checked = prefersColorScheme;
  elementoHtml.setAttribute(
    "data-theme",
    prefersColorScheme ? "dark" : "light"
  );

  botaoDark.addEventListener("change", () => {
    if (!botaoDark.checked) {
      changeTheme("light");
    } else {
      changeTheme("dark");
    }
  });

  const changeTheme = (theme) => {
    const themeValues = {
      light: {
        "--fundo-0": "#000000",
        "--fundo-1": "#ffffff",
        "--fundo-2": "#141414",
        "--fundo-3": "#f5f5f5",
        "--fundo-4": "#efefef",
        "--fonte-cor-1": "#141414",
        "--fonte-cor-2": "#525252",
        "--fonte-cor-3": "#141414",
        "--icone-link": 'url("../img/link-preto.svg") no-repeat center center',
        "--logo": 'url("../img/marcaA.svg") no-repeat center center',
        "--mix-blend-mode": "screen",
      },
      dark: {
        "--fundo-0": "#ffffff",
        "--fundo-1": "#181a1b",
        "--fundo-2": "#0f1011",
        "--fundo-3": "#1e2021",
        "--fundo-4": "#4d4d4d",
        "--fonte-cor-1": "#cacaca",
        "--fonte-cor-2": "#b4aea4",
        "--fonte-cor-3": "#e8e6e3",
        "--icone-link": 'url("../img/link-branco.svg") no-repeat center center',
        "--logo": 'url("../img/marcaB.svg") no-repeat center center',
        "--mix-blend-mode": "darken",
      },
    };

    for (const prop in themeValues[theme]) {
      document.documentElement.style.setProperty(
        prop,
        themeValues[theme][prop]
      );
    }
  };
}
prefersColorScheme();

// let theme = localStorage.getItem("data-theme");
// localStorage.setItem("data-theme", "dark");
/* Verifica se tem no localStorage seleção do dark theme
if (localStorage.getItem("data-theme") == "dark") {
  botaoDark.checked = true;
}*/


function duplicateAndAppend() {
  const primariaScrolls = document.querySelectorAll('.primaria-scroll');
  primariaScrolls.forEach(function(primariaScroll) {
    const clone = primariaScroll.cloneNode(true);
    primariaScroll.parentNode.insertBefore(clone, primariaScroll.nextSibling);
  });
}
duplicateAndAppend();


function verificarLarguraDaTela() {
  // Verifica se a largura da tela é menor ou igual a 500 pixels
  if (!window.matchMedia('(max-width: 500px)').matches) {
    let i = 0;
    const contarAte3 = setInterval(callbackReload, 1000);

    function callbackReload() {
      if (!sessionStorage.getItem('recarregou')) {
        if (i > 2) {
          sessionStorage.setItem('recarregou', true);
          location.reload();
        }
        i++;
      } else {
        clearInterval(contarAte3);
      }
    }

    window.addEventListener('beforeunload', function () {
      sessionStorage.setItem('recarregou', false);
    });
  }
}
if (!window.matchMedia('(max-width: 500px)').matches) {
  verificarLarguraDaTela();
}