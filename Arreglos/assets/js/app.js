
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

