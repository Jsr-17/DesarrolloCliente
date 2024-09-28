 /*
 Ejercicio 1: Determinar el día de la semana
Escribe un programa que utilice getDay() para mostrar qué día de la semana es hoy y si es un día laborable (lunes a viernes) 
o fin de semana (sábado y domingo).
*/
 
 //Iniciamos un objeto fecha con el dia de mi cumpleaños y otro con el dia de hoy, con getDay() obtenemos el dia 
 const dia1 = new Date('July 17, 2024 12:00:00');
 const dia = new Date();


 switch (dia.getDay()) {
     case 1 :
   case 2:
     case 3:
     case 4:
    case 5:
        document.write("Es entre semana <br>");        
         break;
     case 6:
     case 7:
        document.write("Es finde semana <br>");
        break;

    default:
        break;
}

/*
Ejercicio 2: Convertir texto a mayúsculas y minúsculas
Escribe un programa que solicite al usuario una cadena de texto y luego la muestre en mayúsculas y en minúsculas utilizando toUpperCase() y toLowerCase().
*/

//Pedimos una frase y las convertimos

let frase = prompt("Introduzca una frase ");

document.write(frase.toUpperCase()+"<br>");
document.write(frase.toLowerCase()+"<br>");

/*
Ejercicio 4: Verificar si una palabra está presente
Escribe un programa que pida al usuario que ingrese una frase y una palabra. 
El programa debe verificar si la palabra se encuentra en la frase usando includes().
*/

//Pedimos una frase y una palabra si se encuentra en la frase o no escribimos el resultado en el dom

const fraseNueva=prompt("Introduzca una frase");
const palabra=prompt("Introduzca una palabra");

fraseNueva.includes(palabra)? document.write(`Contiene la palabra ${palabra}<br>`): document.write(`No contiene la palabra ${palabra} <br>`)

/*
Ejercicio 5: Fecha y hora actual
Crea un programa que muestre la fecha y la hora actual utilizando getFullYear(), getMonth(), getDate(), getHours(), y getMinutes().
*/ 

//Escribimos en el dom el resultado del uso del objeto date

document.write(`Estamos en el año ${dia.getFullYear()}  del mes ${dia.getMonth()} del día ${dia.getDate()} y son las ${dia.getHours()}:${dia.getMinutes()}`)