//funcion declarativa numero aleatorio

function creaAleatorio(){
    return Math.random();
}

const num= creaAleatorio();

console.log(num);

const numero=()=>Math.round(Math.random()*10);

const aleatorioNum=numero();
console.log(aleatorioNum);