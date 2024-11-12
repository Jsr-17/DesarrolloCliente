const letraInput = document.querySelector("#palabra");
const btnEnviar = document.querySelector("#enviar");
const contenedorPalabra = document.querySelector("#mostrarPalabra");
const contenedorFalladas = document.querySelector("#palabrasFalladas");
const intentos = document.querySelector("#intentos");

class Ahorcado {
  palabra = "";
  intentos = 0;
  constructor(palabra, intentos) {
    this.palabra = palabra;
    this.intentos = intentos;
    this.palabrasAdivinadas = [];
    this.palabrasFalladas = [];
  }
  compruebaLetra(letra) {
    if (this.palabra.includes(letra)) {
      this.palabrasAdivinadas.push(letra);
      this.muestraPalabra();
    } else {
      if (this.palabrasFalladas.indexOf(letra) == -1) {
        this.palabrasFalladas.push(letra);
      }
      this.intentos--;
      this.muestraPalabrasFalladas();
      this.muestraIntentos();
    }
  }
  escribeLetra() {
    let palabraConstruida = "";
    const palabraArr = [...this.palabra];
    //javaScript no permite el uso de map en strings por lo que uso el spread operator con el objetivo de volverlo un array separado
    palabraArr.map((letra) =>
      this.palabrasAdivinadas.includes(letra)
        ? (palabraConstruida += letra)
        : (palabraConstruida += " - ")
    );
    return palabraConstruida.trim();
  }
  muestraPalabra() {
    contenedorPalabra.textContent = this.escribeLetra();
  }
  muestraPalabrasFalladas() {
    contenedorFalladas.lastChild.remove();
    const div = document.createElement("div");
    const palabras = [...this.palabrasFalladas];
    div.textContent = palabras.map((letra) => letra);
    contenedorFalladas.append(div);
  }
  muestraIntentos() {
    intentos.textContent = this.intentos;
  }
  compruebaEstado() {
    if (contenedorPalabra.textContent === this.palabra) {
      const span = document.createElement("span");
      const btn = document.createElement("button");
      const div = document.createElement("div");
      span.textContent = "Enhorabuena la palabra era: " + this.palabra;
      btn.textContent = "Resetea el juego";
      btn.onclick = this.resetea();
      div.append(span, btn);
      contenedorFalladas.append(div);
    } else if (this.intentos === 0) {
      const span = document.createElement("span");
      const btn = document.createElement("button");
      const div = document.createElement("div");
      span.textContent = "Has perdido la palabra era: " + this.palabra;
      btn.textContent = "Resetea el juego";
      btn.onclick = this.resetea();
      div.append(span, btn);
      contenedorFalladas.append(div);
    }
  }
  resetea() {}
}

const juego = new Ahorcado("java", 5);
juego.muestraPalabra();
juego.muestraIntentos();

btnEnviar.addEventListener("click", () => {
  const letra = letraInput.value;
  juego.compruebaLetra(letra);
  juego.compruebaEstado();
});
