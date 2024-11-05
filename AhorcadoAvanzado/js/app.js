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
  //En esta version avanzada solo va a ser necesario el constructor voy a inicializar todos los valores en el momento de qu se instancie el objeto
  constructor() {
    //Este metodo se encarga de recoger los datos del metodo e inicializar tanto los atributos como mostrar por pantalla por primera vez
    this.creaJuego().then((res) => {
      this.palabra = this.limpiaTildes(res.palabra);
      this.intentos = res.intento;
      this.muestraPalabras();
    });

    //contenedores donde van a ser colocadas las palabras
    this.palabrasFalladas = [];
    this.palabrasAdivinadas = [];

    //Eventos de sonido que guian al usuario
    this.sonidoFallo = new Audio("./assets/sounds/fallo.mp3");
    this.sonidoAcierto = new Audio("./assets/sounds/acierto.mp3");
    this.sonidoVictoria = new Audio("./assets/sounds/victoria.mp3");
    this.sonidoDerrota = new Audio("./assets/sounds/derrota.mp3");
    this.sonidoInicioPartida = new Audio("./assets/sounds/inicio.mp3");
  }
  //Funcion asincrona encargada de la logica de inicio del juego
  creaJuego = async () => {
    //Valores que van a ser los encargados de la logica de la dificultad del juego
    let propDificultad;
    let propPalabra;

    //Valores que el usuario selecciona en el dropdown
    const nEleccion = dificultad.selectedIndex;
    const valor = dificultad[nEleccion].value;

    //Contenedores que almacenaran las palabras y segun la dificultad elegida apareceran aleatoriamente
    let faciles = [];
    let dificiles = [];
    let medio = [];

    //peticiones a la API
    const res = await fetch("http://localhost:3000/palabras");
    const data = await res.json();

    //Una vez sacados los datos de la peticion async los coloco en cada uno de los respectivos contenedores
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

    //segun el valor que el usuario pasa por el dropdown se genera una palabra aleatoria y todos tienen 7 intentos

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

    //Estructuro los datos en un objeto literal para retornarlos en un mismo contendor y luego solo tener que hacer la desestructuracion

    const datos = {
      intento: propDificultad,
      palabra: propPalabra,
    };

    return datos;
  };
  // funcion encargada de comprobar cada una de las letras
  compruebaLetra(letra) {
    //Si la letra es un espacio vacio o nada cancela todo
    if (letra == "" && letra == " ") {
      return;
    }
    //busca en el contenedor de la palabra la letra
    if (this.palabra.includes(letra)) {
      //en caso afirmativo mete la letra en el contenedor de palabras adivinadas , muestra la palabra al completo y produce el sonido de acierto
      this.palabrasAdivinadas.push(letra);
      this.muestraPalabras();
      this.sonidoAcierto.play();
      //En el caso de que la palabra sea exactamente igual que la palabra del contenedor html informa al usuario de la victoria y reproduce el sonido, ejecuta el metodo para finalizar \
      // el juego tambien
      if (this.palabra == contenedorPalabra.innerText) {
        contenedorIntentos.textContent = "Has ganado";
        this.finDelJuego();
        this.sonidoVictoria.play();
      }
      //En el caso de que haya fallado
    } else {
      //Primero notifica el sonido de que ha fallado
      this.sonidoFallo.play();
      //Si no se encuentra la letra en el vector de fallos la mete y resta un intento
      if (this.palabrasFalladas.indexOf(letra) == -1) {
        this.palabrasFalladas.push(letra);
        this.intentos--;
      }
      //Resetea la palabra , cambia la imagen
      this.muestraPalabras();
      this.cambiaImagen();
      //en el momento que pierdes activa el evento de sonido , informa al usuario tanto de la palabra como de su perdida, inicia el metodo de fin de juego
      if (this.intentos == 0) {
        this.sonidoDerrota.play();
        contenedorIntentos.textContent =
          "Has perdido la palabra era: " + this.palabra;
        this.finDelJuego();
        return;
      }
    }
  }
  //Funcion encargada de escribir las letras que se van pasando
  escribeLetra() {
    let palabraConstruida = "";
    //variable que almacena las letras separadas en cada indice
    const palabraArr = [...this.palabra];
    //javaScript no permite el uso de map en strings por lo que uso el spread operator con el objetivo de volverlo un array separado

    //Recorre el array comprobando si esa letra existe o no  en nuestro vector de palabras acertadas y construye la palabra
    palabraArr.map((letra) => {
      this.palabrasAdivinadas.includes(letra)
        ? (palabraConstruida += letra)
        : (palabraConstruida += "-");
    });
    //La devuelve sin espacios
    return palabraConstruida.trim();
  }
  //llama a metodos y informa al usuario
  muestraPalabras() {
    this.muestraPalabrasFalladas();
    contenedorPalabra.innerHTML = this.escribeLetra();
    contenedorIntentos.textContent = this.intentos;
  }
  //Funcion de utilidad la cual recorre el array y sustituye las vocales con tildes por vocales sin ellas para simplificarlo
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
  //metodo que acaba el juego para hacer un primer reseteo parcial y la creacion del boton para el reseteo e inicio
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
  //funcion que resetea todo volviendo a llamar a los metodos que tambien son usados en el constructor  y resetea el canvas
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

    //contenedor canvas
    const canvas = document.querySelector("#ahorcadoCanvas");
    const ctx = canvas.getContext("2d");
    //resetea el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //carga el reseteo
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };
  //muestra las palabras falladas en el contenedor
  muestraPalabrasFalladas() {
    const contenedor = document.querySelector("#contenedorPalabraFallidas");
    contenedor.innerHTML = this.palabrasFalladas;
  }
  //funcion que sirve para modificar la imagen
  cambiaImagen() {
    if (this.intentos == 7) {
      img.src = "";
      return;
    }
    //creacion de la imagen del canvas
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

//evento del boton
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

  //sonido al iniciar el juego

  juego.sonidoInicioPartida.play();

  //eventos para el juego uno para al darle intro y el otro en el boton para al hacer click en el boton
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
