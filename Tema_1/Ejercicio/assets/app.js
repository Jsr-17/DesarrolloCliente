/*
//Ejercio 1

// Esta linea almacena el nombre del usuario cual el usuario introduce en un pop-up

let nombreUsuario=prompt("Introduzca el nombre del usuario");


//Muestra un pop-up con el nombre del usuario

alert("El nombre de usuario es: "+nombreUsuario);


//Muestro por consola el nombre del usuario

console.log("El nombre de usuario es: "+nombreUsuario);

//Ejercicio 2

//Sirve para controlar cuando el usuario introduzca valores que no sean numericos

try {
    //Esta linea sirve para pedir la edad al usuario y la convierte a numeros 
    
    let edadUsuario=Number(prompt("Introduzca su edad "));

    //Condicionales para mostrar mensajes personalizados conforme a la edad del usuario



    if (edadUsuario>=18) {
        alert("Bienvenido");
    }else if(dadUsuario<18){
        alert("Es menor de edad no puede acceder");
    }

    console.log(edadUsuario);

} catch (error) {

    //Mensaje para informar al usuario del error 
    
    alert("Debe usar unicamente numeros");
}

//Ejercicio 3

//En esta variable guardo el resultado booleano de la decision del usuario

let decisionUsuario=confirm("Desea seguir navegando?");

//Conforme la decision del usuario muestro una ruta de accion

if (decisionUsuario) {

    alert("Un placer continuar con su navegacion");

    console.log("El usuario decidio continuar");

}else{
    
    alert("Que tenga un buen dia");
    console.log("El usuario decidio no continuar")

}

//Ejercicio 4

try {
    //Esta linea sirve para pedir los  numeros al usuario 
    
    let n1=Number(prompt("Introduzca un numero"));
    let n2=Number(prompt("Introduzca otro numero"));


    //Muestra el resultado por pantalla 

    alert("El resultado es: "+(n1+n2));

    //Muestra el resultado por consola 

    console.log("El resultado es: "+(n1+n2));


} catch (error) {

    //Mensaje para informar al usuario del error 
    
    alert("Debe usar unicamente numeros");
}

    //Ejercicio 5
    
   

    try {
        
        //Variable para guardar la temperatura introducida por el usuario

        let grados =Number(prompt("Introduzca una temperatura para connvertir a grados Celsius"));

        //Formula de conversion a grados

        let resultado= grados * 9/5 + 32.
        
        alert("El resultado es: "+resultado);

        console.log("El resultado es: "+resultado);

    } catch (error) {
        alert("Debe de utilizar numeros");
        
    }

    //Ejercicio 6

    //Variable que guarda los datos del usario
        let pass =prompt("Introduzca su pass");

        let acertado=false;

        let passPredefinda="1234";

    //Bucle  para hacer el acceso

    while (!acertado) {

        if (pass===passPredefinda) {

            alert("Puede iniciar sesion");
            acertado=true
            console.log("Contrasena acertada");

        }else{
            console.log("Contrasena erronea")
            alert("Credenciales incorrectas");
        }

    }*/
//Ejercicio 7

    let numeroRandom=Math.floor( Math.random()*10)+1;
    let acertadoNum=false;

    console.log(numeroRandom);
try {
        //Como el prompt tiene tanta prioridad que he testeado una forma para hacer tiempo para poder ver la consola antes de que se ejecute el codigo
    setTimeout(()=>{
        while (!acertadoNum) {

        let numeroSecreto=Number(prompt("Adivina el numero secreto"));
 
 
         if(numeroSecreto===numeroRandom){
             alert("Has acertado");
             acertadoNum=true;
             console.log("Has acertado")
         }else{
             alert("Has fallado");
             console.log("Has fallado");
         }
 
   }}
   ,3000);
    
} catch (error) {
    
    console.log("Haz uso de solo numeros");
    alert("Haz uso solo de numeros")

}


