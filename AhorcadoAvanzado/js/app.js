//Funciones de utilidades
const generaNumAleatorio = (num) => {
  return Math.floor(num * Math.random());
};

//Elementos seleccionados del dom

const contenedorIntentos = document.querySelector("#contenedorIntentos");
const contenedorPalabra = document.querySelector("#contenedorPalabra");
const canvas = document.querySelector("#ahorcadoCanvas");
const btnActivaEvento = document.querySelector("#btnActivaPalabra");
const main = document.querySelector("#main");
const iniciaJuego = document.querySelector("#iniciaJuego");
const dificultad = document.querySelector("#dificultad");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Clase ahorcado++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class Ahorcado {
  palabra = "";
  intentos = "";
  constructor(intentos, palabra) {
    this.intentos = intentos;
    this.palabra = palabra;
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

<div class="info-display mb-3">
  Intentos restantes: <span id="contenedorIntentos"> </span>
</div>

<div class="text-center d-flex align-items-center justify-content-center">
  <input type="text" maxlength="1" />
  <button class="btn btn-primary mx-2" id="btnActivaPalabra">
    Enviar palabra
  </button>
</div>
</div>`;
  const nEleccion = dificultad.selectedIndex;
  const valor = dificultad[nEleccion].value;
  let propDificultad = 0;
  let propPalabra = "";

  const creaJuego = async () => {
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
        propDificultad = 10;
        propPalabra = faciles[generaNumAleatorio(faciles.length)];
        break;
      case "medio":
        propDificultad = 5;
        propPalabra = medio[generaNumAleatorio(medio.length)];

        break;
      case "dificil":
        propDificultad = 5;
        propPalabra = dificiles[generaNumAleatorio(dificiles.length)];

        break;

      default:
        break;
    }

    const juego = new Ahorcado(propDificultad, propPalabra);
  };
  creaJuego();
});
