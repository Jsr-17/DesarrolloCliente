//Definicion de variables globales
let baraja=[];
let tipoCarta=['C','D','P','T'];
let especiales=['A','K','Q','J'];

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
    isNaN(puntos)? puntos=='A' ?  11 : 10 : puntos *= 1;
    
    return puntos;
}

crearBaraja();
valorCarta(pedirCarta());