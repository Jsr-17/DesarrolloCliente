//Definicion de variables globales
let baraja=[];
let tipoCarta=['C','D','P','T'];
let especiales=['A','K','Q','J'];
let puntosJugador=0,puntosBanca=0;
//Referencias a objetos del html
const btnPedir=document.querySelector("#btn_pedir");
const btnPasar=document.querySelector("#btn_pasar");
const btnNuevo=document.querySelector("#btn_nuevoJuego");
const marcador=document.querySelectorAll("small");
const divJugadorCarta=document.querySelector('#jugadorCartas')



//Crear baraja para comenzar a repatir cartas
//con bucles for

const crearBaraja=()=>{

    for (let index = 2; index <= 10 ; index++) {
        for (let tipo of tipoCarta) {
            baraja.push(index+tipo);
        }
    }
    for (const e of tipoCarta) {
        for (const i of especiales) {
            baraja.push(i+e);

        }
    }
   

    baraja=_.shuffle(baraja);

    return baraja;
}

//Pedir una carta y retirarla de la baraja
const pedirCarta=()=>{
    const carta=baraja.pop();
    if (baraja.length ===0) {
        throw "No hay cartas";
    }

    return carta;
}


//Calculamos el valor de la carta
const valorCarta=(carta)=>{
    let puntos =carta.substring(0,carta.length-1);
    isNaN(puntos) ? puntos=== 'A' ?  puntos=11 : puntos=10 : puntos *=1;
    return puntos;
}

//Eventos del juego

btnPedir.addEventListener("click",()=>{
    //carta que nos da el cupier
    const carta=pedirCarta();
    //Puntos que obtiene el jugador
    puntosJugador=puntosJugador+valorCarta(carta);
    //Puntos en el contenedor
    marcador[1].innerText=puntosJugador;
    //carta creada del html
    const imgCarta=document.createElement('img');
    imgCarta.src="assets/cartas/"+carta+".png"
    imgCarta.classList.add("carta");

    
    //anadir carta al divisor 
    divJugadorCarta.append(imgCarta);


});
//carta que nos da el cupier



//Main --------------------------------------------------------



crearBaraja();
//valorCarta(pedirCarta());