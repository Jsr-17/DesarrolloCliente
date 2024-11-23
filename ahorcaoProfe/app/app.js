const letraInput = document.querySelector("#palabra");
const btnEnviar = document.querySelector("#enviar");
const contenedorPalabra = document.querySelector("#mostrarPalabra");
const contenedorFalladas = document.querySelector("#palabrasFalladas");
const intentos = document.querySelector("#intentos");
const canvas = document.getElementById("ahorcado");
const ctx = canvas.getContext("2d");

let fallos = 0;

function dibujarAhorcado(fallos) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";

  switch (fallos) {
    case 9: // Poste vertical
      ctx.beginPath();
      ctx.moveTo(50, 350);
      ctx.lineTo(50, 50);
      ctx.stroke();
      break;
    case 8: // Poste horizontal
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(150, 50);
      ctx.stroke();
      break;
    case 7: // Cuerda
      ctx.beginPath();
      ctx.moveTo(150, 50);
      ctx.lineTo(150, 100);
      ctx.stroke();
      break;
    case 6: // Cabeza
      ctx.beginPath();
      ctx.arc(150, 130, 30, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 5: // Cuerpo
      ctx.beginPath();
      ctx.moveTo(150, 160);
      ctx.lineTo(150, 250);
      ctx.stroke();
      break;
    case 4: // Brazo izquierdo
      ctx.beginPath();
      ctx.moveTo(150, 180);
      ctx.lineTo(120, 220);
      ctx.stroke();
      break;
    case 3: // Brazo derecho
      ctx.beginPath();
      ctx.moveTo(150, 180);
      ctx.lineTo(180, 220);
      ctx.stroke();
      break;
    case 2: // Pierna izquierda
      ctx.beginPath();
      ctx.moveTo(150, 250);
      ctx.lineTo(120, 300);
      ctx.stroke();
      break;
    case 1: // Pierna derecha
      ctx.beginPath();
      ctx.moveTo(150, 250);
      ctx.lineTo(180, 300);
      ctx.stroke();
      break;
  }
}

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
      console.log(this.intentos);
      this.intentos--;
      this.muestraPalabrasFalladas();
      this.muestraIntentos();
      dibujarAhorcado(this.intentos);
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
    div.id = "palabrasFalladasDiv";
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
      div.id = "contenedorEliminable";
      btn.classList.add("mx-3");
      span.textContent = "Enhorabuena la palabra era: " + this.palabra;
      btn.textContent = "Resetea el juego";
      btn.addEventListener("click", () => this.resetea());
      div.append(span, btn);
      contenedorFalladas.append(div);
    } else if (this.intentos === 0) {
      const span = document.createElement("span");
      const btn = document.createElement("button");
      const div = document.createElement("div");
      div.setAttribute("id", "contenedorEliminable");
      btn.classList.add("mx-3");
      span.textContent = "Has perdido la palabra era: " + this.palabra;
      btn.textContent = "Resetea el juego";
      btn.onclick = this.resetea();
      div.append(span, btn);
      contenedorFalladas.append(div);
    }
  }
  resetea() {
    this.intentos = 10;
    this.palabrasAdivinadas = [];
    this.palabrasFalladas = [];
    this.muestraPalabra();
    this.muestraPalabrasFalladas();
    this.muestraIntentos();
    const div = document.getElementById("contenedorEliminable");
    div.remove();
  }
}

const juego = new Ahorcado("java", 10);
juego.muestraPalabra();
juego.muestraIntentos();

btnEnviar.addEventListener("click", () => {
  const letra = letraInput.value;
  juego.compruebaLetra(letra);
  juego.compruebaEstado();
  letraInput.value = "";
  letraInput.focus();
});
