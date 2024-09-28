/*
const operaArreglo=(arr)=>{
    //Con el método reduce simplemente sumo sucesivamente los valores del array
    console.log("La suma total es "+arr.reduce((valor,valorActual)=>valor+valorActual));
    
    //Con el metodo reduce primero obtengo la suma total y luego con el tamaño del array obtengo el total de numeros a dividir
    let promedio =arr.reduce((valor,valorActual)=>valor+valorActual)/arr.length;
    console.log("El promedio es "+promedio);

    //Con el metodo reduce primero obtengo el numero mas alto  a base de comparar el siguiente con el anterior
    let mayor = arr.reduce((anterior,siguiente)=>anterior>siguiente?anterior:siguiente);
    console.log("El mayor es "+mayor);
    
    //Con el metodo reduce primero obtengo el numero mas bajo  a base de comparar el siguiente con el anterior
    let menor = arr.reduce((anterior,siguiente)=>siguiente<anterior?siguiente:anterior);
    console.log("El menor es "+menor);
}

const numeros=[89,1,2,3,4,5,15,4,12];

operaArreglo(numeros);

const operaNotas=(arr)=>{
    let aprobados=0;
    let suspendidos=0;
        
    //Con el metodo reduce primero obtengo la suma total y luego con el tamaño del array obtengo el total de numeros a dividir
    let promedio =arr.reduce((valor,valorActual)=>valor + valorActual) / arr.length;
    console.log("El promedio de las notas es "+promedio);

     //Con el metodo reduce primero obtengo el numero mas alto  a base de comparar el siguiente con el anterior
     let mayor = arr.reduce((anterior,siguiente)=>anterior > siguiente ? anterior : siguiente);
     console.log("La nota más alta  es "+mayor);
     
     //Con el metodo reduce primero obtengo el numero mas bajo  a base de comparar el siguiente con el anterior
     let menor = arr.reduce((anterior,siguiente)=>siguiente < anterior ? siguiente : anterior);
     console.log("La nota más baja  es "+menor);

     arr.map((valor)=>valor>=5 ? aprobados++ : suspendidos++)
     console.log("El número de aprobados es "+aprobados+" y el número de suspendidos es "+suspendidos);
 }

 const notas=[2.3,10,4.99,3.32,4.95,6,10,8,5];

operaNotas(notas);

*/
/*
Ejercicio 1: Filtrar números pares e impares
Instrucciones:
1. Escribe una función que reciba un arreglo de números.
2. La función debe devolver dos arreglos: uno con los números pares y otro con los
números impares.
Explicación:
• Se recorre el arreglo y se utiliza el operador módulo (%) para verificar si un número es
par o impar.
• Dependiendo del resultado, se agrega el número al arreglo pares o al arreglo impares.
*/

let pares=[];
let impares=[];
const arrDesordenado = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const paresImpares=(numeros)=>{
    //recorremos el array e asignamos los valores segun si es impar o par
for (const key in numeros) {
    key%2==0 ? pares.push(key):impares.push(key)
    }
}

paresImpares(arrDesordenado);

//imprimo el array por consola para ver el correcto funcionamiento

console.log(pares,impares);

/*
Ejercicio 2: Invertir un arreglo
Instrucciones:
1. Escribe una función que reciba un arreglo y lo devuelva invertido (sin usar métodos
como reverse()).
Explicación:
• Utilizamos un ciclo for que empieza desde el último elemento del arreglo y recorre
hacia el primero, agregando los elementos a un nuevo arreglo arregloInvertido.
*/

let arregloInvertido=[];


//funcion que itera de manera inversa el array y empezamos desde la posicion 19==20

const invierteArray=(arr)=>{

    for (let index = arr.length-1 ; index >= 0 ; index--) {
     arregloInvertido.push(arr[index]);
}
}
invierteArray(arrDesordenado);

console.log(arregloInvertido);


/*
Ejercicio 3: Encontrar elementos mayores que un valor
Instrucciones:
1. Escribe una función que reciba un arreglo de números y un valor límite.
2. La función debe devolver un nuevo arreglo con los números mayores que ese valor
límite.
Explicación:
• La función recorre el arreglo y compara cada número con el valor límite.
• Si el número es mayor que el límite, se agrega al nuevo arreglo mayores.
*/
let arrayMayores=[];

//Itera sobre el array comparando los numeros por el minimo y los incluye en el array Mayores recibe un array obligatorio como parámetro

const devuelveMinimo=(min,array=[])=>{
    for (let index = 0; index < array.length; index++) {
        
        array[index]>min ? arrayMayores.push(array[index]):min
       
    }
}
devuelveMinimo(5,arrDesordenado);

console.log(arrayMayores);


/*
Ejercicio 4: Calcular el promedio de las notas
Instrucciones:
1. Escribe una función que reciba un arreglo de notas.
2. La función debe calcular el promedio de las notas y devolverlo.
Explicación:
• La función recorre el arreglo notas, suma todos los valores y luego divide la suma entre
la cantidad de notas para obtener el promedio.
*/ 



const notas  = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10];

//La variable suma acumula en cada vuelta cada elemento del array

const calculaPromedio=(array)=>{
    let suma=0;
for (let index = 0; index < array.length; index++) {
     suma += array[index];
}
return suma/array.length;
}
console.log(calculaPromedio(notas));


/* 
Ejercicio 2: Encontrar la nota más alta y más baja
Instrucciones:
1. Escribe una función que reciba un arreglo de notas.
2. La función debe devolver la nota más alta y la nota más baja.
Explicación:
• Utilizamos los métodos Math.max() y Math.min() con el operador de expansión (...)
para encontrar la nota más alta y más baja en el arreglo.
*/

const notasDestacadas=(arr=[])=>{
    let alta=Math.max(...arr);
    let baja=Math.min(...arr);

    return [alta,baja];

}

console.log(notasDestacadas(notas));

/*
Ejercicio 3: Contar cuántos estudiantes aprobaron y reprobaron
Instrucciones:
1. Escribe una función que reciba un arreglo de notas.
2. La función debe contar cuántos estudiantes aprobaron (nota >= 6) y cuántos
reprobaron (nota < 6).
); Explicación:
• Se recorre el arreglo y, mediante una condición (if),se cuentan los estudiantes que
aprobaron (nota mayor o igual a 6) y los que reprobaron (nota menor a 6).
• El resultado se devuelve en un objeto con los valores de aprobados y reprobados.
*/ 

let aprobados=[];
let suspensos=[];

//recorre el array y conforme se cumple la condición entra en uno o en otro
let compruebaNotas=(arr=[])=>{
    for (let index = 0; index < arr.length; index++) {
          arr[index]>=5 ? aprobados.push(arr[index]) : suspensos.push(arr[index]);
        
    }
}

compruebaNotas(notas);

console.log(aprobados,suspensos);