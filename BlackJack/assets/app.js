class Baraja {
    constructor() {
        this.mazo = [];
    }
    creaMazo() {
        //Definicion de variables globales


        let tipoCarta = ["♠", "♥", "♣", "♦️"];
        let especiales = ['A', 'K', 'Q', 'J'];

        //Crear baraja para comenzar a repatir cartas
        //con bucles for
        for (let index = 2; index <= 10; index++) {
            for (let tipo of tipoCarta) {
                this.mazo.push(index + tipo);
            }
        }
        for (const e of tipoCarta) {
            for (const i of especiales) {
                this.mazo.push(i + e);

            }
        }
    }
    sacaCarta(){
        let numeroAleatorio=Math.round(Math.random()*this.mazo.length);
        let cartaAleatoria=this.mazo[numeroAleatorio];
        let posicion=this.mazo.indexOf(cartaAleatoria);
        this.mazo.splice(posicion,1);
        return cartaAleatoria
    }
}

//Constructor principal de la clase donde la logica del juego va a ser diseñada
class Juego {
    constructor(carta, suma, pierde) {
        this.carta = carta;
        this.suma = suma;
        this.pierde = pierde;
    }
    //Este método se encarga de generar las cartas aleatorias,hacer la llamada a la suma y guardar las cartas
    juegaCartas(baraja) {
        //Almaceno la carta
        this.carta.push(baraja);
        //Almaceno la suma 
        this.suma = this.sumaCartas();
        this.suma > 21 ? this.pierde = true : false;
    }
    //Este método se encarga de hacer la suma de las cartas 
    sumaCartas() {
        //Me quedo con el valor numeral de cada carta 
        let valorNumeral = this.carta.map((value) => {
            //El 10 al ser un numero compuesto tengo que tener mas cuidado con el si no solo saco el 1 
            if (value.includes("10")) {
                return "10";
            }
            return value[0]
        });
        //Saco los valores de caracteres al valor 10

        for (let index = 0; index < valorNumeral.length; index++) {
            if (valorNumeral[index] == "Q" || valorNumeral[index] == "K" || valorNumeral[index] == "J") {
                valorNumeral[index] = "10";
            }
        }
        //Registro la posición del comodín en el caso de que aparezca

        let comodin = valorNumeral.indexOf("A");

        //Si el comodín aparece entonces lo guardo en la última posición del array para tener control sobre el 
        //Como es un string no puede ser convertido a int aún

        if (comodin != -1) {
            let as = valorNumeral[comodin];
            valorNumeral.splice(comodin, 1);
            valorNumeral.push(as);
        }
        //Convierto cada numero distinto al comodin a número
        let valorNumerico = valorNumeral.map((value) => value != "A" ? parseInt(value) : value);

        //Aplico la suma donde también incluyo el caso del comodín el cual según el contexto suma 11 o solo 1
        let total = valorNumerico.reduce((suma, valor) => valor != "A" ? suma += valor : suma + 11 <= 21 ? suma + 11 : suma + 1);

        //Devuelvo el valor de la suma
        return total
    }
}
//Clase del o los usuarios que jugaran

class Usuario extends Juego {

    constructor(dinero, usuario, pass, carta, suma, pierde) {
        super(carta, suma, pierde)
        this.dinero = dinero;
        this.usuario = usuario;
        this.pass = pass;

    }
}
//Clase del Cupier el cual sera la banca 
class Cupier extends Juego {
    constructor(dinero, carta, personas, suma) {
        super(carta, suma);
        this.dinero = dinero;
        this.personas = personas;
    }
}
//Clase de las Cartas
class Cartas {
    constructor(url, cartas, jug) {
        this.url = url;
        this.cartas = cartas;
        this.jug = jug;
    }

    //Método encargado de obtener el valor de las cartas que van saliendo para poder mostrarlas luego por pantalla

    muestraCartas() {
        const carta = document.getElementById(this.jug.id);
        let urlCartas = this.cartas.map((value) => value = "./assets/img/" + value + ".png");
        this.url.push(...urlCartas);

        for (let index = 0; index < this.url.length; index++) {
            const img = document.createElement("img");
            img.src = this.url[index];
            carta.appendChild(img);
        }
    }
    muestraCarta() {
        const carta = document.getElementById(this.jug.id);
        let ultima = this.cartas.length
        let urlCartas = "./assets/img/" + this.cartas[ultima - 1] + ".png"

        const img = document.createElement("img");
        img.src = urlCartas;
        carta.appendChild(img);


    }

}
const cojeCartaDom=(jugador,cartasJugador,sumaJugador,zonaJugador,e)=>{    
    jugador.juegaCartas(baraja.sacaCarta());
    zonaJugador=e.target;

    cartasJugador.muestraCarta();
    sumaJugador.innerHTML=0;
    if (jugador.pierde) {
        zonaJugador.style.display = "none";

        while (zonaJugador.firstChild) {
            zonaJugador.removeChild(zonaJugador.firstChild);
        }

        cartasJugador.muestraCartas();

        let div = document.createElement("div");
        div.innerHTML = "Has Perdido ";
        div.innerHTML += "<br>";
        div.innerHTML += " Tu total suma:  " + jugador.suma
        zonaJugador.appendChild(div);


    }
    sumaJugador.innerHTML = jugador.suma;
}

//Eventos generales 
const modal = document.querySelector(".modal");
const invitado = document.getElementById("invitado");
const menuInicio = document.querySelector(".menuInicio");
const menuJugadores = document.querySelector(".menuJugadores");
const obtnJugadores = document.getElementById("nJugadores");
const iniciarJuego = document.getElementById("iniciarJuego");

//Zonas de jugador
const cupierZona = document.getElementById("cupier");
const jugador1Zona = document.getElementById("j1");
const jugador2Zona = document.getElementById("j2");
const jugador3Zona = document.getElementById("j3");
const jugador4Zona = document.getElementById("j4")

//Dinero de jugador
const jugador1Din = document.getElementById("din1");
const jugador2Din = document.getElementById("din2");
const jugador3Din = document.getElementById("din3");
const jugador4Din = document.getElementById("din4");

//Suma total de cartas
const jugador1Sum = document.getElementById("sum1");
const jugador2Sum = document.getElementById("sum2");
const jugador3Sum = document.getElementById("sum3");
const jugador4Sum = document.getElementById("sum4");
const cupierSum = document.getElementById("sumCupier");

//Pedir Cartas 
const j1PideCarta = document.getElementById("pCarta1");
const j2PideCarta = document.getElementById("pCarta2");
const j3PideCarta = document.getElementById("pCarta3");
const j4PideCarta = document.getElementById("pCarta4");

const baraja=new Baraja();

//Propiedades del cupier
const cupier = new Cupier(1500, [], [], 0);
const cartasCupier = new Cartas([], cupier.carta, cupierZona);

//Propiedades del 1 jugador
const jugador1 = new Usuario(300, "Invitado1", "", [], 0, false);
const cartasjugador1 = new Cartas([], jugador1.carta, jugador1Zona);

//Propiedades del jugador 2
const jugador2 = new Usuario(300, "Invitado2", "", [], 0, false);
const cartasjugador2 = new Cartas([], jugador2.carta, jugador2Zona);

//Propiedades del jugador 2
const jugador3 = new Usuario(300, "Invitado3", "", [], 0, false);
const cartasjugador3 = new Cartas([], jugador3.carta, jugador3Zona);

//Propiedades del jugador 2
const jugador4 = new Usuario(300, "Invitado4", "", [], 0, false);
const cartasjugador4 = new Cartas([], jugador4.carta, jugador4Zona);


//Propiedades agrupadas
const jugadores = [jugador1, jugador2, jugador3, jugador4];
const cartas = [cartasjugador1, cartasjugador2, cartasjugador3, cartasjugador4];
const jugadoresDin = [jugador1Din, jugador2Din, jugador3Din, jugador4Din];
const jugadoresSum = [jugador1Sum, jugador2Sum, jugador3Sum, jugador4Sum]

//variables necesarias
let nJugadores;

baraja.creaMazo();

//Esconde el menú de inicio y muestra el de nº Jugadores
invitado.addEventListener("click", () => {
    menuInicio.style.display = "none";
    menuJugadores.style.display = "flex";
});

//Esconde el menú  de nº Jugadores y muestra la partida con el tablero lleno;
iniciarJuego.addEventListener("click", () => {
    menuJugadores.style.display = "none";
    modal.style.display = "none";
    nJugadores = obtnJugadores.value;
    cupier.juegaCartas(baraja.sacaCarta());
    cupier.juegaCartas(baraja.sacaCarta());
    cartasCupier.muestraCartas();
    
    cupierSum.innerHTML = cupier.suma;

    for (let index = 0; index < nJugadores; index++) {
        jugadores[index].juegaCartas(baraja.sacaCarta());
        jugadores[index].juegaCartas(baraja.sacaCarta());
        jugadoresDin[index].innerHTML = jugadores[index].dinero;
        jugadoresSum[index].innerHTML = jugadores[index].suma;

        cartas[index].muestraCartas();

        if (jugadores[index].suma > 21) {
            alert(jugadores[index] + " Has perdido");
        }
    }
})

j1PideCarta.addEventListener("click", (e)=>cojeCartaDom(jugador1,cartasjugador1,jugador1Sum,jugador1Zona,e))

j2PideCarta.addEventListener("click", () => {
    jugador2.juegaCartas(baraja.sacaCarta());
    cartasjugador2.muestraCarta();

    jugador2Sum.innerHTML = 0;
    if (jugador2.pierde) {
        j2PideCarta.style.display = "none";

        while (jugador2Zona.firstChild) {
            jugador2Zona.removeChild(jugador2Zona.firstChild);
        }
        cartasjugador2.muestraCartas();

        let div = document.createElement("div");
        div.innerHTML = "Has Perdido ";
        div.innerHTML += "<br>";
        div.innerHTML += " Tu total suma:  " + jugador2.suma
        jugador2Zona.appendChild(div);


    }
    jugador2Sum.innerHTML = jugador2.suma;

})

j3PideCarta.addEventListener("click", () => {
    jugador3.juegaCartas(baraja.sacaCarta());
    cartasjugador3.muestraCarta();

    jugador3Sum.innerHTML = 0;
    if (jugador3.pierde) {
        j3PideCarta.style.display = "none";

        while (jugador3Zona.firstChild) {
            jugador3Zona.removeChild(jugador3Zona.firstChild);
        }
        cartasjugador3.muestraCartas();

        let div = document.createElement("div");
        div.innerHTML = "Has Perdido ";
        div.innerHTML += "<br>";
        div.innerHTML += " Tu total suma:  " + jugador3.suma;
        jugador3Zona.appendChild(div);


    }
    jugador3Sum.innerHTML = jugador3.suma;

})

j4PideCarta.addEventListener("click", () => {
    jugador4.juegaCartas(baraja.sacaCarta());
    cartasjugador4.muestraCarta();

    jugador4Sum.innerHTML = 0;
    if (jugador4.pierde) {
        j4PideCarta.style.display = "none";

        while (jugador4Zona.firstChild) {
            jugador4Zona.removeChild(jugador4Zona.firstChild);
        }

        cartasjugador4.muestraCartas();

        let div = document.createElement("div");
        div.innerHTML = "Has Perdido ";
        div.innerHTML += "<br>";
        div.innerHTML += " Tu total suma:  " + jugador4.suma
        jugador4Zona.appendChild(div);


    }
    jugador4Sum.innerHTML = jugador4.suma;

})
