//Ejercicio 1

//Inicio arrColoresay con valores

let arrColores=["rojo","verde","azul"];

//El método push introduce en ultimo lugar el elemento amarillo 

arrColores.push("amarillo");

console.log(arrColores);

//El método shift elimina el primer elemento del arrColoresay 

arrColores.shift();

console.log(arrColores);

//El método unshift introduce al inicio el elemento

arrColores.unshift("naranja");

console.log(arrColores);

//Ejercicio 2

let arrAnimales=["perro","gato","conejo","tigre"];


//El método splice remueve del array los elementos desde la posición desde que seleccionamos hasta la cantidad que le asignemos
//Y permite añadir un nuevo elemento en esa posición 
//Importante los elementos que entran en este rango son guardados en un nuevo array asique es necesario guardar los valores en caso necesario


arrAnimales.splice(2,0,"león");

console.log(arrAnimales);

//Guardo en la variable tigre el dato que remueve la parte del código anterior

let tigre=arrAnimales.splice(4,1);

console.log(arrAnimales)
console.log(tigre);

//Ejercicio 3

let arrNumeros=[5, 10, 15, 20, 25];

let suma=0;

//Preferiria usar reduce() pero la diferencia es mínima al hacer uso  de una variable auxiliar 
/*
suma =arrNumeros.reduce(
    (n,acumulador)=>{
    return n+acumulador}
);
*/ 

arrNumeros.forEach(n=>{suma+=n});

console.log(suma);

//Ejercicio 4

let vectorNum=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let arrPar=[];

//El método filter sirve para filtrar en un array el contenido segun la logica de la callback que apliquemos

arrPar =vectorNum.filter(n=>n%2==0);

console.log(arrPar);


//Ejercicio 5

let arrNombres=[ 'Luis', 'Ana', 'Pedro', 'Sofía', 'María'];

arrNombres.sort();
console.log(arrNombres);

//Ejercicio 6 

let dias=[ 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

dias.reverse();

console.log(dias);

//Ejercicio 7

let frutas=['manzana', 'banana', 'cereza', 'fresa', 'naranja'];

let indice=frutas.indexOf("fresa");

console.log(indice);

//Ejercicio 8

let numeros = [1, 2, 3, 2, 4, 5, 5, 6];


//Itero cada elemento en primer lugar
for (let e = 0; e < numeros.length; e++) {
    //Compruebo si la siguiente posicion esta repetida en alguna parte del array y la elimino 
    for (let i = e +1 ; i < numeros.length; i++) {
        if (numeros[e]===numeros[i]) {
            numeros.splice(i,1);
        }
    }  
}
console.log(numeros);


//Ejercicio 9

let arreglo1 = [10, 20, 30];
let arreglo2 = [40, 50, 60];

let arregloFinal= arreglo1.concat(arreglo2);

console.log(arregloFinal);



//Ejercicio 10

let tareas=[];
let salir=false;

while (!salir) {
    let usuarioTarea=prompt("Ingrese Tareas");


    if (usuarioTarea==="salir"|| usuarioTarea==="Salir" ) {
        break;
    }
    usuarioTarea[0].toUpperCase();
    tareas.push(usuarioTarea);
    
}

console.log(tareas);

//Ejercicio 11

let numerosEj11= [3, 45, 6, 7, 23, 5, 76, 34];

//Si el anterior es mayor al actual nos quedamos con el anterior y viceversa 
let mayor=numerosEj11.reduce(((anterior,actual)=>anterior > actual ? anterior : actual));

console.log(": El número más grande es: "+mayor);

