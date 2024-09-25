// const dia = new Date('July 17, 2024 12:00:00');
//     console.log(dia.getDay());

// switch (dia.getDay()) {
//     case 1 :
//     case 2:
//     case 3:
//     case 4:
//     case 5:
//         console.log("Es entre semana");        
//         break;
//     case 6:
//     case 7:
//         console.log("Es finde semana");
//         break;

//     default:
//         break;
// }


const arr=[100,1,2,3,4];

console.log(arr.reduce((anterior,actual)=>anterior > actual? anterior:actual))