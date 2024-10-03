
//-------------------------------------------------Clase Baraja-----------------------------------------------


//Clase encargada de la lógica del mazo de cartas
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
    //Lógica encargada de sacar la carta y eliminarla del mazo para que sea eliminada del juego

    sacaCarta() {
        let numeroAleatorio = Math.floor(Math.random() * this.mazo.length);
        let cartaAleatoria = this.mazo[numeroAleatorio];
        let posicion = this.mazo.indexOf(cartaAleatoria);

        this.mazo.splice(posicion, 1);
        return cartaAleatoria
    }
}


//---------------------------------------------------------------Clase Juego-----------------------------------------------------------------------------



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


//------------------------------------------------------Clase hija Usuario------------------------------------------------------------------



//Clase del o los usuarios que jugaran

class Usuario extends Juego {

    constructor(dinero, usuario, pass, carta, suma, pierde, pasar,activo) {
        super(carta, suma, pierde)
        this.dinero = dinero;
        this.usuario = usuario;
        this.pass = pass;
        this.pasar = pasar;
        this.activo = activo;


    }
}

//---------------------------------------------------------Clase hija Cupier----------------------------------------------------------------


//Clase del Cupier el cual sera la banca 
class Cupier extends Juego {
    constructor(dinero, carta, personas, suma) {
        super(carta, suma);
        this.dinero = dinero;
        this.personas = personas;
        this.turno=true
    }
    empiezaTurno(baraja){
        this.turno=true
        for (let index = 0; index < this.personas.length; index++) {
            if (!this.personas[index].pierde && !this.personas[index].pasar) {
                return this.turno=false;
            }
            
        }
        if (this.turno) {
            console.log("hola");
            this.personas.forEach(value=>{

                value.activo ? value.suma> this.suma ?  this.juegaCartas(baraja) :console.log("es menor") : console.log("No activo");
            });
        }
    }
}




//-------------------------------------------------------------Clase Carta-------------------------------------------------------------------



//Clase de las Cartas
class Cartas {
    constructor(url, cartas, jug) {
        this.url = url;
        this.cartas = cartas;
        this.jug = jug;
    }

    //Métodos encargados de obtener el valor de las cartas que van saliendo para poder mostrarlas luego por pantalla

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






//-------------------------------------------------------------Funciones---------------------------------------------------------------------------------- 

//Método encargado de la modificación de la carga en pantalla de las cartas y de muestra de información en pantalla

//Los parámetros son las partes del objeto importantes del funcionamiento de esta lógica
const cojeCartaDom = (jugador, cartasJugador, sumaJugador, zonaJugador, e,cupier) => {
    if (jugador.pasar) {
        return;
    }
    jugador.juegaCartas(baraja.sacaCarta());
    zonaJugador = e.target;

    cartasJugador.muestraCarta();
    sumaJugador.innerHTML = 0;

    //Cuando el jugador se pasa debemos de avisar por pantalla
    if (jugador.pierde) {
        zonaJugador.style.display = "none";
        sumaJugador.style.fontSize = "20px";
        sumaJugador.innerHTML = "Te has pasado tu total es de: " + jugador.suma;
        cupier.empiezaTurno(baraja.sacaCarta());
        return;
    }
    //En caso contrario Seguimos con el juego
    sumaJugador.innerHTML = jugador.suma;
    cupier.empiezaTurno(baraja.sacaCarta());
}




const plantarse = (jugador,elemento,cupier) => {
       if (!jugador.pasar && !jugador.pierde ) {
        jugador.pasar=true;

        let div = document.createElement('div');
        div.innerText="SE HA PLANTADO";
        div.style.marginLeft="3px";
        div.style.padding="3px";
        div.style.border="solid 3px black";
        div.style.backgroundColor="white"
        div.style.textAlign="center";
        
        elemento.parentElement.appendChild(div);    
       } 
       cupier.empiezaTurno(baraja.sacaCarta());
}

//------------------------------------------------------------Eventos y manejo del DOM-----------------------------------------------------------




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

//Pasar Turno o Plantarse
const j1Pasar = document.getElementById("pasar1");
const j2Pasar = document.getElementById("pasar2");
const j3Pasar = document.getElementById("pasar3");
const j4Pasar = document.getElementById("pasar4");


//---------------------------------------------------------------------Objetos Juego---------------------------------------------------------------------------


//Objeto de baraja
const baraja = new Baraja();

//Propiedades del 1 jugador
const jugador1 = new Usuario(300, "Invitado1", "", [], 0, false, false);
const cartasjugador1 = new Cartas([], jugador1.carta, jugador1Zona);

//Propiedades del jugador 2
const jugador2 = new Usuario(300, "Invitado2", "", [], 0, false, false);
const cartasjugador2 = new Cartas([], jugador2.carta, jugador2Zona);

//Propiedades del jugador 2
const jugador3 = new Usuario(300, "Invitado3", "", [], 0, false, false);
const cartasjugador3 = new Cartas([], jugador3.carta, jugador3Zona);

//Propiedades del jugador 2
const jugador4 = new Usuario(300, "Invitado4", "", [], 0, false, false);
const cartasjugador4 = new Cartas([], jugador4.carta, jugador4Zona);



//------------------------------------------------------------------------Arrays--------------------------------------------



//Propiedades agrupadas
const jugadores = [jugador1, jugador2, jugador3, jugador4];
const cartas = [cartasjugador1, cartasjugador2, cartasjugador3, cartasjugador4];
const jugadoresDin = [jugador1Din, jugador2Din, jugador3Din, jugador4Din];
const jugadoresSum = [jugador1Sum, jugador2Sum, jugador3Sum, jugador4Sum];




//---------------------------------------------------------------------Objetos Cupier---------------------------------------------------------------------------


//Propiedades del cupier
const cupier = new Cupier(1500, [], jugadores, 0);
const cartasCupier = new Cartas([], cupier.carta, cupierZona);


//------------------------------------Variables------------------------------------------

let nJugadores;








//Inicia un mazo
baraja.creaMazo();








//-------------------------------------------------------------------Eventos---------------------------------------------------------------


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
    cartasCupier.muestraCartas();


    let img = document.createElement('img');
    img.src = "./assets/img/reverso-gris.png";
    cupierZona.appendChild(img);
    cupierSum.innerHTML = cupier.suma;

    //Itera por cada jugador y comprueba segun el índice si es un jugador activo o no 
    jugadores.forEach((jugador, index) => {
        jugador.pasar = (index + 1) > nJugadores ? true : false;
        jugador.activo= jugador.pasar ? false : true;
    });

    //Inicializa los datos de los jugadores activos 

    for (let index = 0; index < nJugadores; index++) {

        jugadores[index].juegaCartas(baraja.sacaCarta());
        jugadores[index].juegaCartas(baraja.sacaCarta());

        jugadoresDin[index].innerHTML = jugadores[index].dinero;
        jugadoresSum[index].innerHTML = jugadores[index].suma;

        cartas[index].muestraCartas();

    }
});




//Eventos generales de la pedida de las  cartas 
j1PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador1, cartasjugador1, jugador1Sum, jugador1Zona, e,cupier));

j2PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador2, cartasjugador2, jugador2Sum, jugador2Zona, e,cupier));

j3PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador3, cartasjugador3, jugador3Sum, jugador3Zona, e,cupier));

j4PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador4, cartasjugador4, jugador4Sum, jugador4Zona, e,cupier));



//Evento de plantarse y no pedir más cartas

j1Pasar.addEventListener("click", ()=>plantarse(jugador1,j1Pasar,cupier));
j2Pasar.addEventListener("click", ()=>plantarse(jugador2,j2Pasar,cupier));
j3Pasar.addEventListener("click", ()=>plantarse(jugador3,j3Pasar,cupier));
j4Pasar.addEventListener("click", ()=>plantarse(jugador4,j4Pasar,cupier));