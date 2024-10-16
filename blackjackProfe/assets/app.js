//Definicion de variables globales
let baraja = [];
let tipoCarta = ["C", "D", "P", "T"];
let especiales = ["A", "K", "Q", "J"];
let puntosJugador = 0,
  puntosBanca = 0;
//Referencias a objetos del html
const btnPedir = document.querySelector("#btn_pedir");
const btnPasar = document.querySelector("#btn_pasar");
const btnNuevo = document.querySelector("#btn_nuevoJuego");
const marcador = document.querySelectorAll("small");
const divJugadorCarta = document.querySelector("#jugadorCartas");
const divBancaCarta = document.querySelector("#bancaCartas");
const resultado = document.querySelector("#ganador");

//Crear baraja para comenzar a repatir cartas
//con bucles for

const crearBaraja = () => {
  for (let index = 2; index <= 10; index++) {
    for (let tipo of tipoCarta) {
      baraja.push(index + tipo);
    }
  }
  for (const e of tipoCarta) {
    for (const i of especiales) {
      baraja.push(i + e);
    }
  }

  baraja = _.shuffle(baraja);

  return baraja;
};

//Pedir una carta y retirarla de la baraja
const pedirCarta = () => {
  const carta = baraja.pop();
  if (baraja.length === 0) {
    throw "No hay cartas";
  }

  return carta;
};

//Calculamos el valor de la carta
const valorCarta = (carta) => {
  let puntos = carta.substring(0, carta.length - 1);
  isNaN(puntos)
    ? puntos === "A"
      ? (puntos = 11)
      : (puntos = 10)
    : (puntos *= 1);
  return puntos;
};

//Eventos del juego

btnPedir.addEventListener("click", () => {
  //carta que nos da el cupier
  const carta = pedirCarta();
  //Puntos que obtiene el jugador
  puntosJugador = puntosJugador + valorCarta(carta);
  //Puntos en el contenedor
  marcador[1].innerText = puntosJugador;
  //carta creada del html
  const imgCarta = document.createElement("img");
  imgCarta.src = "assets/cartas/" + carta + ".png";
  imgCarta.classList.add("carta");

  //anadir carta al divisor
  divJugadorCarta.append(imgCarta);

  if (puntosJugador >= 21) {
    btnPedir.disabled = true;
    btnPasar.disabled = true;
    turnoBanca(puntosJugador);
  }
});
btnPasar.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnPasar.disabled = true;
  turnoBanca(puntosJugador);
});
btnNuevo.addEventListener("click", () => {
  btnPedir.disabled = false;
  btnPasar.disabled = false;
  puntosBanca = 0;
  puntosJugador = 0;
  for (let index = 0; index < marcador.length; index++) {
    marcador[index].innerText = 0;
  }
  baraja = []
  crearBaraja();
  divBancaCarta.innerHTML = "";
  divJugadorCarta.innerHTML = "";
});

//Main --------------------------------------------------------

const turnoBanca = (puntosJugador) => {
  do {
    //carta que nos da el cupier
    const carta = pedirCarta();
    //Puntos que obtiene el jugador
    puntosBanca = puntosBanca + valorCarta(carta);
    //Puntos en el contenedor
    marcador[0].innerText = puntosBanca;
    //carta creada del html
    const imgCarta = document.createElement("img");
    imgCarta.src = "assets/cartas/" + carta + ".png";
    imgCarta.classList.add("carta");
    divBancaCarta.append(imgCarta);
  } while (puntosBanca < puntosJugador && puntosJugador <= 21);
  puntosBanca === puntosJugador ? (resultado.innerHTML = "empate") : 
  puntosJugador > puntosBanca && puntosJugador <= 21||puntosBanca>21 ? 
  (resultado.innerHTML = "Gana jugador") : 
  (resultado.innerHTML = "Gana la banca");
};

crearBaraja();
//valorCarta(pedirCarta());
