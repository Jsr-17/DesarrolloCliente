//como declarar array

const arr = [];
const videojuegos=["Mario kart","zelda","Fallout",4];


videojuegos.splice(0,0,"elefante");
 const data=videojuegos.filter((value,index,array)=>value=="elefante");
console.log(data);