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

crearBaraja();