const letraInput = document.querySelector("#palabra");
const btnEnviar = document.querySelector("#enviar");

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
      // this.muestraPalabra();
    } else {
      this.palabrasFalladas.push(letra);
      this.intentos--;
    }
  }
  escribeLetra() {
    let palabraConstruida = "";
    const palabraArr = [...this.palabra];
    //javaScript no permite el uso de map en strings por lo que uso el spread operator con el objetivo de volverlo un array separado
    console.log(palabraArr);
    palabraArr.map((letra) =>
      this.palabrasAdivinadas.includes(letra)
        ? (palabraConstruida += letra)
        : (palabraConstruida += "-")
    );
    return palabraConstruida.trim();
  }
}

const juego = new Ahorcado("java", 5);

btnEnviar.addEventListener("click", () => {
  const letra = letraInput.value;
  juego.compruebaLetra(letra);
  console.log(juego.escribeLetra());
});
