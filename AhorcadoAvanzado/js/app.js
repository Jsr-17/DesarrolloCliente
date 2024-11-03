//Funciones de utilidades
const generaNumAleatorio = (num) => {
  return Math.floor(num * Math.random());
};

//Elementos seleccionados del dom
const main = document.querySelector("#main");
const iniciaJuego = document.querySelector("#iniciaJuego");
const dificultad = document.querySelector("#dificultad");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Clase ahorcado++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class Ahorcado {
  constructor() {
    this.creaJuego().then((res) => {
      this.palabra = this.limpiaTildes(res.palabra);
      this.intentos = res.intento;
      this.muestraPalabras();
    });
    this.palabrasFalladas = [];
    this.palabrasAdivinadas = [];
    this.sonidoFallo = new Audio("./assets/sounds/fallo.mp3");
    this.sonidoAcierto = new Audio("./assets/sounds/acierto.mp3");
    this.sonidoVictoria = new Audio("./assets/sounds/victoria.mp3");
    this.sonidoDerrota = new Audio("./assets/sounds/derrota.mp3");
    this.sonidoInicioPartida = new Audio("./assets/sounds/inicio.mp3");
  }

  creaJuego = async () => {
    let propDificultad;
    let propPalabra;
    const nEleccion = dificultad.selectedIndex;
    const valor = dificultad[nEleccion].value;
    let faciles = [];
    let dificiles = [];
    let medio = [];
    const res = await fetch("http://localhost:3000/palabras");
    const data = await res.json();
    const dataSinEstructurar = data.map(({ palabra }) => palabra);
    dataSinEstructurar.map((data) => {
      if (data.length <= 5) {
        faciles.push(data);
      } else if (data.length <= 10) {
        medio.push(data);
      } else {
        dificiles.push(data);
      }
    });
    switch (valor) {
      case "facil":
        propDificultad = 7;
        propPalabra = faciles[generaNumAleatorio(faciles.length)];
        break;
      case "medio":
        propDificultad = 7;
        propPalabra = medio[generaNumAleatorio(medio.length)];

        break;
      case "dificil":
        propDificultad = 7;
        propPalabra = dificiles[generaNumAleatorio(dificiles.length)];

        break;

      default:
        break;
    }
    const datos = {
      intento: propDificultad,
      palabra: propPalabra,
    };
    return datos;
  };
  compruebaLetra(letra) {
    if (letra == "") {
      return;
    }
    if (this.palabra.includes(letra)) {
      this.palabrasAdivinadas.push(letra);
      this.muestraPalabras();
      this.sonidoAcierto.play();
      if (this.palabra == contenedorPalabra.innerText) {
        contenedorIntentos.textContent = "Has ganado";
        this.finDelJuego();
        this.sonidoVictoria.play();
      }
    } else {
      this.sonidoFallo.play();
      if (this.palabrasFalladas.indexOf(letra) == -1) {
        this.palabrasFalladas.push(letra);
        this.intentos--;
      }
      this.muestraPalabras();
      this.cambiaImagen();
      if (this.intentos == 0) {
        this.sonidoDerrota.play();
        contenedorIntentos.textContent =
          "Has perdido la palabra era: " + this.palabra;
        this.finDelJuego();
        return;
      }
    }
  }
  escribeLetra() {
    let palabraConstruida = "";
    const palabraArr = [...this.palabra];
    //javaScript no permite el uso de map en strings por lo que uso el spread operator con el objetivo de volverlo un array separado
    palabraArr.map((letra) => {
      this.palabrasAdivinadas.includes(letra)
        ? (palabraConstruida += letra)
        : (palabraConstruida += "-");
    });
    return palabraConstruida.trim();
  }
  muestraPalabras() {
    this.muestraPalabrasFalladas();
    contenedorPalabra.innerHTML = this.escribeLetra();
    contenedorIntentos.textContent = this.intentos;
  }
  limpiaTildes(palabra) {
    let palabraConstruida = "";
    const palabraArr = [...palabra];
    palabraArr.map((letra) => {
      switch (letra) {
        case "á":
          letra = "a";
          break;
        case "é":
          letra = "e";
          break;
        case "ó":
          letra = "o";
          break;
        case "ú":
          letra = "u";
          break;
        case "í":
          letra = "i";
          break;

        default:
          break;
      }
      palabraConstruida += letra;
    });
    return palabraConstruida;
  }
  finDelJuego() {
    this.palabrasAdivinadas = [];
    this.palabrasFalladas = [];
    const btn = document.createElement("button");
    btn.textContent = "Reinicia Juego";
    btn.setAttribute("id", "resetea");
    btn.classList.add("btn", "btn-primary", "mx-2");
    contenedor.append(btn);
    btn.addEventListener("click", () => this.resetea());
  }
  resetea = () => {
    this.creaJuego().then((res) => {
      this.palabra = this.limpiaTildes(res.palabra);
      this.intentos = res.intento;
      this.muestraPalabras();
    });
    this.palabrasFalladas = [];
    this.palabrasAdivinadas = [];
    const btn = document.getElementById("resetea");
    btn.remove();
    this.sonidoInicioPartida.play();
    const canvas = document.querySelector("#ahorcadoCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };
  muestraPalabrasFalladas() {
    const contenedor = document.querySelector("#contenedorPalabraFallidas");
    contenedor.innerHTML = this.palabrasFalladas;
  }
  cambiaImagen() {
    if (this.intentos == 7) {
      img.src = "";
      return;
    }
    const img = new Image();
    const canvas = document.querySelector("#ahorcadoCanvas");
    const ctx = canvas.getContext("2d");

    img.src = `./assets/img/img-${this.intentos}.png`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
}

//+++++++++++++++++++++++++++++++++++Logica Juego ++++++++++++++++++++++

iniciaJuego.addEventListener("click", () => {
  main.innerHTML = `
    <div class="container game-container my-5">
<h2 class="text-center mb-4">Juego del Ahorcado Avanzado</h2>

<div class="canvas-container mb-4">
  <canvas id="ahorcadoCanvas" width="400" height="300"></canvas>
</div>

<div class="word-display mb-3" id="contenedorPalabra"></div>
<div class="word-display mb-3" id="contenedorPalabraFallidas"></div>

<div class="info-display mb-3">
  Intentos restantes: <span id="contenedorIntentos"> </span>
</div>

<div class="text-center d-flex align-items-center justify-content-center" id="contenedor">
  <input type="text" id="inputLetra" maxlength="1" />
  <button class="btn btn-primary mx-2" id="btnActivaPalabra">
    Enviar palabra
  </button>
</div>
</div>`;

  //Elementos seleccionados del dom

  const contenedorIntentos = document.querySelector("#contenedorIntentos");
  const contenedor = document.querySelector("#contenedor");
  const contenedorPalabra = document.querySelector("#contenedorPalabra");
  const inputLetra = document.querySelector("#inputLetra");
  const btnActivaEvento = document.querySelector("#btnActivaPalabra");

  let juego = new Ahorcado();

  juego.sonidoInicioPartida.play();
  btnActivaEvento.addEventListener("click", () => {
    juego.compruebaLetra(inputLetra.value);
    inputLetra.value = "";
    inputLetra.focus();
  });
  inputLetra.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      juego.compruebaLetra(inputLetra.value);
      inputLetra.value = "";
      inputLetra.focus();
    }
  });
});
