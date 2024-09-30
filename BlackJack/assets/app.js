
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

