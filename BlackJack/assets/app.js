/*
//Constructor principal de la clase donde la logica del juego va a ser diseñada
 class Juego {
    constructor(carta,suma) {
        this.carta = carta;
        this.suma = suma;
    }
    //Este método se encarga de generar las cartas aleatorias,hacer la llamada a la suma y guardar las cartas
    juegaCartas() {
        const arrayPalos = ["♠", "♥", "♣", "♦️"]
        const arrayNum = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "K", "J", "A"];

        //Genera cartas alatorias

        let paloAleatorio = arrayPalos[Math.round(Math.random() * (arrayPalos.length - 1))];
        let numAleatorio = arrayNum[Math.round(Math.random() * (arrayNum.length - 1))];

        //Almaceno la carta
        this.carta.push(numAleatorio.concat(paloAleatorio));
        //Almaceno la suma 
        this.suma=this.sumaCartas();
    }
    //Este método se encarga de hacer la suma de las cartas 
    sumaCartas() {
        //Me quedo con el valor numeral de cada carta 
        let valorNumeral = this.carta.map((value) =>{
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

        let comodin=valorNumeral.indexOf("A");

        //Si el comodín aparece entonces lo guardo en la última posición del array para tener control sobre el 
        //Como es un string no puede ser convertido a int aún

        if (comodin != -1) {
            let as=valorNumeral[comodin];
            valorNumeral.splice(comodin,1);
            valorNumeral.push(as);
        }
        //Convierto cada numero distinto al comodin a número
        let valorNumerico=valorNumeral.map((value)=>value != "A" ? parseInt(value) : value);

        //Aplico la suma donde también incluyo el caso del comodín el cual según el contexto suma 11 o solo 1
        let total=valorNumerico.reduce((suma,valor)=>valor !="A" ? suma+=valor: suma+11<=21 ? suma+11 : suma+1);

        //Devuelvo el valor de la suma
        return total
    }
}
//Clase del o los usuarios que jugaran

 class Usuario extends Juego {

    constructor(dinero, usuario, pass, carta,suma) {
        super(carta,suma)
        this.dinero = dinero;
        this.usuario = usuario;
        this.pass = pass;

    }
}
//Clase del Cupier el cual sera la banca 
 class Cupier extends Juego {
    constructor(dinero, carta,personas,suma) {
        super(carta,suma);
        this.dinero = dinero;
        this.personas = personas;
    }
}
//Clase de las Cartas
 class Cartas {
    constructor( url,cartas,jug) {
        this.url = url;
        this.cartas=cartas;
        this.jug = jug;
    }
    
    //Método encargado de obtener el valor de las cartas que van saliendo para poder mostrarlas luego por pantalla

    muestraCartas(){
        const carta=document.getElementById(this.jug.id);
        let urlCartas=this.cartas.map((value)=>value="./assets/img/"+value+".png");
        console.log(carta);
        this.url.push(...urlCartas);

        for (let index = 0; index < this.url.length; index++) {
            const img = document.createElement("img");
            img.src=this.url[index];
            carta.appendChild(img);
        }
    }

}


*/

import { Cupier,Cartas,Usuario } from "./Juego.js";

const modal=document.querySelector(".modal");
const invitado=document.getElementById("invitado");
const menuInicio=document.querySelector(".menuInicio");
const menuJugadores=document.querySelector(".menuJugadores");
const obtnJugadores=document.getElementById("nJugadores");
const iniciarJuego=document.getElementById("iniciarJuego");


const cupierZona=document.getElementById("cupier");
const jugador1Zona=document.getElementById("j1");
const jugador2Zona=document.getElementById("j2");
const jugador3Zona=document.getElementById("j3");
const jugador4Zona=document.getElementById("j4")

const jugador1Din=document.getElementById("din1");
const jugador2Din=document.getElementById("din2");
const jugador3Din=document.getElementById("din3");
const jugador4Din=document.getElementById("din4");

const jugador1Sum=document.getElementById("sum1");
const jugador2Sum=document.getElementById("sum2");
const jugador3Sum=document.getElementById("sum3");
const jugador4Sum=document.getElementById("sum4");
const cupierSum=document.getElementById("sumCupier");




const cupier = new Cupier(1500,[],[],0);
const cartasCupier= new Cartas([],cupier.carta,cupierZona);

const jugador1= new Usuario(300,"Invitado1","",[],0);
const cartasjugador1= new Cartas([],jugador1.carta,jugador1Zona);

const jugador2= new Usuario(300,"Invitado2","",[],0);
const cartasjugador2= new Cartas([],jugador2.carta,jugador2Zona);

const jugador3= new Usuario(300,"Invitado3","",[],0);
const cartasjugador3= new Cartas([],jugador3.carta,jugador3Zona);

const jugador4= new Usuario(300,"Invitado4","",[],0);
const cartasjugador4= new Cartas([],jugador4.carta,jugador4Zona);

const jugadores=[jugador1,jugador2,jugador3,jugador4];
const cartas=[cartasjugador1,cartasjugador2,cartasjugador3,cartasjugador4];
const jugadoresDin=[jugador1Din,jugador2Din,jugador3Din,jugador4Din];
const jugadoresSum=[jugador1Sum,jugador2Sum,jugador3Sum,jugador4Sum]


let nJugadores;

invitado.addEventListener("click",()=>{
    menuInicio.style.display="none";
    menuJugadores.style.display="flex";
});

iniciarJuego.addEventListener("click",()=>{
    menuJugadores.style.display="none";
    modal.style.display="none";
    nJugadores= obtnJugadores.value;
    cupier.juegaCartas();
    cupier.juegaCartas();
    cartasCupier.muestraCartas();
    cupierSum.innerHTML=cupier.suma;

    for (let index = 0; index < nJugadores; index++) {
        jugadores[index].juegaCartas();
        jugadores[index].juegaCartas();
        jugadoresDin[index].innerHTML=jugadores[index].dinero;
        jugadoresSum[index].innerHTML=jugadores[index].suma;

        cartas[index].muestraCartas();

        if (jugadores[index].suma>21) {
            alert(jugadores[index]+" Has perdido");
        }
    }
})

