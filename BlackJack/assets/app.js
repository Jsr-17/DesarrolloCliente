
//-------------------------------------------------Clase Baraja-----------------------------------------------

//Clase encargada de la lógica del mazo de cartas
class Baraja {
    constructor() {
        this.mazo = [];
    }
    creaMazo() {
        //resetea mazo
        this.mazo = [];
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
        //En mi black Jack si un jugador saca doble comodin directamente suma 21

        if (valorNumeral[0] == "A" && valorNumeral[1] == "A") {
            valorNumeral[1] = 10;
            valorNumeral[0] = 11;
        }

        //Convierto cada numero distinto al comodin a número
        let valorNumerico = valorNumeral.map((value) => value != "A" ? value * 1 : value);

        //Aplico la suma donde también incluyo el caso del comodín el cual según el contexto suma 11 o solo 1
        let total = valorNumerico.reduce((suma, valor) => valor != "A" ? suma += valor : suma + 11 <= 21 ? suma + 11 : suma + 1);

        //Devuelvo el valor de la suma
        return total
    }
}


//------------------------------------------------------Clase hija Usuario------------------------------------------------------------------



//Clase del o los usuarios que jugaran

class Usuario extends Juego {

    constructor(dinero, usuario, pass, carta, suma, pierde, pasar, activo ) {
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
        this.turno = true
    }
    //Función con la cual el cupier empieza a jugar
    empiezaTurno(baraja) {
        //reseteo el turno

        this.turno = true
        //hace la comprobación de que nadie aun haya perdido o se haya plantado
        for (let index = 0; index < this.personas.length; index++) {
            if (!this.personas[index].pierde && !this.personas[index].pasar) {
                return this.turno = false;
            }

        }
        //empieza el turno del cupier
        if (this.turno) {
            //Variable para guardar el numero mas alto de los jugadores
            let masAlta = 0;

            for (let index = 0; index < this.personas.length; index++) {
                //Almaceno la suma más alta de las personas
                this.personas[index].suma <= 21 && this.personas[index].suma > masAlta ? masAlta = this.personas[index].suma : masAlta;

                masAlta == 21 ? masAlta - 2 : masAlta;

                //El cupier saca cartas hasta superar esa cifra o sacar 21

                while (masAlta > cupier.suma && cupier.suma <= 21) {
                    this.juegaCartas(baraja.sacaCarta());
                }

                //Resetea el html 
                cupierZona.innerHTML = '<h1>Cupier  Suma Total: <span id="sumCupier"></span> </h1>'
                let suma = document.getElementById("sumCupier");
                suma.innerText = cupier.suma;
            }
            //Elimino la primera carta para que no se repita en el html
            cartasCupier.url.shift();
            //Muestra las cartas del cupier
            cartasCupier.muestraCartas();
            //Elimina el boton de pasar
            jugadorPlantarse.forEach((value) => value.style.display = "none");
            jugadorPedirCarta.forEach((element) => element.style.display = "none");


            //filtro los que han ganado 
            let ganadores = this.personas.filter((value) => value.suma > cupier.suma && value.suma <= 21 && value.activo || cupier.suma > 21 && value.suma <= 21 && value.activo);
            let empates = this.personas.filter((value) => value.suma == cupier.suma && value.suma <= 21 && value.activo);

            //Recupero sus nombres
            let nombreGanadores = ganadores.map((value) => value.usuario);
            const nombreEmpate = empates.map((value) => value.usuario);

            //Creo las cabeceras
            const h2Ganador = document.createElement("h2");
            const h2Empate = document.createElement("h2");

            // En el caso de que haya ganadores lo plasmo en el html
            if (ganadores.length >= 1) {
                h2Ganador.innerText = "Victoria de:  ";

                for (let index = 0; index < nombreGanadores.length; index++) {
                    h2Ganador.innerText += " " + nombreGanadores[index];
                }
                h2Ganador.style.border = "solid 3px black";
                h2Ganador.style.marginTop = "4px";

                cupierZona.append(h2Ganador);
            }

            // En el caso de que haya empates lo plasmo en el html

            if (empates >= 1) {
                h2Empate.innerText = "Empate de: ";

                for (let index = 0; index < nombreEmpate.length; index++) {
                    h2Empate.innerText += " , " + nombreEmpate[index];
                }
                h2Empate.style.border = "solid 3px black";
                h2Empate.style.marginTop = "4px";
                cupierZona.append(h2Empate);
            }



        }
    jugarDeNuevo.style.display="block";
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
const cojeCartaDom = (jugador, cartasJugador, sumaJugador, zonaJugador, e, cupier) => {
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
        cupier.empiezaTurno(baraja);
        return;
    }
    //En caso contrario Seguimos con el juego
    sumaJugador.innerHTML = jugador.suma;
    cupier.empiezaTurno(baraja);
}


const reiniciaJuego = () => {


fetch('http://localhost:3000/envia-datos', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(jugadores)
})
.then(response => response.json())  

.then(data => {
    console.log('Success:', data); 
})
.catch(error => {
    console.error('Error:', error);
});

    baraja.creaMazo();

    jugadores.map((value) => value.carta = []);
    cartas.map((value) => {
        value.cartas = [];
        value.url = [];
    }
    );
    cupier.carta = [];
    cupier.suma = 0;
    cartasCupier.url = [];
    cartasCupier.cartas = cupier.carta

    const divPlantarse = document.querySelectorAll(".plantarse");
    const img = document.querySelectorAll('img');
    const h2 = document.querySelectorAll('h2');
    

    h2.forEach((element) => {
        element.remove()
    });


    img.forEach((element) => {
        element.remove();
    });

    divPlantarse.forEach((element) => {
        element.remove();
    })

    for (let index = 0; index < nJugadores; index++) {
        let contenedor = jugadoresZon[index].childNodes.item(3);

        contenedor.childNodes[1].style.display = "block";
        contenedor.childNodes[3].style.display = "block";


        jugadores[index].juegaCartas(baraja.sacaCarta());
        jugadores[index].juegaCartas(baraja.sacaCarta());

        jugadores[index].activo=true;
        jugadores[index].pasar=false;
        jugadores[index].pierde=false;

        jugadoresDin[index].innerHTML = jugadores[index].dinero;
        jugadoresSum[index].innerHTML = jugadores[index].suma;

        cartas[index].cartas = jugadores[index].carta;

        cartas[index].muestraCartas();
    }
    cupier.juegaCartas(baraja.sacaCarta());
    cupierZona.innerHTML = '<h1>Cupier  Suma Total: <span id="sumCupier"></span> </h1>'
    
    let suma = document.getElementById("sumCupier");
    suma.innerText = cupier.suma;
    
    cartasCupier.muestraCartas();
    let imgn = document.createElement('img');
    imgn.src = "./assets/img/reverso-gris.png";
    cupierZona.appendChild(imgn);

    cupier.juegaCartas(baraja.sacaCarta());


}




const iniciaJuego = () => {

    menuJugadores.style.display = "none";
    modal.style.display = "none";

    nJugadores = obtnJugadores.value;

    cupier.juegaCartas(baraja.sacaCarta());
    cartasCupier.muestraCartas();


    let img = document.createElement('img');
    img.src = "./assets/img/reverso-gris.png";
    cupierZona.appendChild(img);
    cupierSum.innerHTML = cupier.suma;
    cupier.juegaCartas(baraja.sacaCarta());


    //Itera por cada jugador y comprueba segun el índice si es un jugador activo o no 
    jugadores.forEach((jugador, index) => {
        jugador.pasar = (index + 1) > nJugadores ? true : false;
        jugador.activo = jugador.pasar ? false : true;
    });

    //Inicializa los datos de los jugadores activos 

    for (let index = 0; index < nJugadores; index++) {

        jugadores[index].juegaCartas(baraja.sacaCarta());
        jugadores[index].juegaCartas(baraja.sacaCarta());

        jugadoresDin[index].innerHTML = jugadores[index].dinero;
        jugadoresSum[index].innerHTML = jugadores[index].suma;

        cartas[index].muestraCartas();

    }
}

//Función con la que cada jugador se planta y no pide mas cartas, y lo plasma en el html 
const plantarse = (jugador, elemento, cupier) => {
    if (!jugador.pasar && !jugador.pierde) {
        jugador.pasar = true;

        let div = document.createElement('div');
        div.innerText = "SE HA PLANTADO";
        div.style.marginLeft = "3px";
        div.style.padding = "3px";
        div.style.border = "solid 3px black";
        div.style.backgroundColor = "white"
        div.style.textAlign = "center";
        div.classList.add("plantarse");

        elemento.parentElement.appendChild(div);
    }
    cupier.empiezaTurno(baraja);

}

//------------------------------------------------------------Eventos y manejo del DOM-----------------------------------------------------------




//Eventos generales 
const modal = document.querySelector(".modal");
const invitado = document.getElementById("invitado");
const menuInicio = document.querySelector(".menuInicio");
const menuJugadores = document.querySelector(".menuJugadores");
const obtnJugadores = document.getElementById("nJugadores");
const iniciarJuego = document.getElementById("iniciarJuego");
const jugarDeNuevo=document.getElementById("juegoNuevo");



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
const jugador1 = new Usuario(300, "Invitado 1", "", [], 0, false, false);
const cartasjugador1 = new Cartas([], jugador1.carta, jugador1Zona);

//Propiedades del jugador 2
const jugador2 = new Usuario(300, "Invitado 2", "", [], 0, false, false);
const cartasjugador2 = new Cartas([], jugador2.carta, jugador2Zona);

//Propiedades del jugador 2
const jugador3 = new Usuario(300, "Invitado 3", "", [], 0, false, false);
const cartasjugador3 = new Cartas([], jugador3.carta, jugador3Zona);

//Propiedades del jugador 2
const jugador4 = new Usuario(300, "Invitado 4", "", [], 0, false, false);
const cartasjugador4 = new Cartas([], jugador4.carta, jugador4Zona);



//------------------------------------------------------------------------Arrays--------------------------------------------



//Propiedades agrupadas
const jugadores = [jugador1, jugador2, jugador3, jugador4];
const cartas = [cartasjugador1, cartasjugador2, cartasjugador3, cartasjugador4];
const jugadoresZon = [jugador1Zona, jugador2Zona, jugador3Zona, jugador4Zona]
const jugadoresDin = [jugador1Din, jugador2Din, jugador3Din, jugador4Din];
const jugadoresSum = [jugador1Sum, jugador2Sum, jugador3Sum, jugador4Sum];
const jugadorPlantarse = [j1Pasar, j2Pasar, j3Pasar, j4Pasar];
const jugadorPedirCarta = [j1PideCarta, j2PideCarta, j3PideCarta, j4PideCarta]




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
iniciarJuego.addEventListener("click", () => iniciaJuego());


jugarDeNuevo.addEventListener("click",()=>reiniciaJuego())



//Eventos generales de la pedida de las  cartas 
j1PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador1, cartasjugador1, jugador1Sum, jugador1Zona, e, cupier));

j2PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador2, cartasjugador2, jugador2Sum, jugador2Zona, e, cupier));

j3PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador3, cartasjugador3, jugador3Sum, jugador3Zona, e, cupier));

j4PideCarta.addEventListener("click", (e) => cojeCartaDom(jugador4, cartasjugador4, jugador4Sum, jugador4Zona, e, cupier));



//Evento de plantarse y no pedir más cartas

j1Pasar.addEventListener("click", () => plantarse(jugador1, j1Pasar, cupier));
j2Pasar.addEventListener("click", () => plantarse(jugador2, j2Pasar, cupier));
j3Pasar.addEventListener("click", () => plantarse(jugador3, j3Pasar, cupier));
j4Pasar.addEventListener("click", () => plantarse(jugador4, j4Pasar, cupier));

