
//Elementos del dom 
const contenedorAhorcado = document.getElementById("content");
const ejecutar5 = document.getElementById("Ejecutar5");

//funcion que muestra el contenido del ejercicio en el html 
ejecutar5.addEventListener("click", () => {

//Contenido del ejercicio
  contenedor.innerHTML = `
  <div class="row">
          <h4 class="text-center" >Ejercicio-5</h4>
          <p class="text-center">
            Mediante la dirección Api rest Json-server
            <br />
            Recuperamos los datos de las palabras <br />
           
          </p>
        </div>
        <button id="ejecutar"> Ejecutar Código </button>
  
        <div class="row">
          <div class="col-4">
            <h5>Palabras en formato Json</h5>
           <div id="ejercicio">
           </div>
          </div>
          <div class="col-2"></div>
          <div class="col-6">
            <h5>Palabras en formato Json (async)</h5>
            <ul class="list-group" id="ejercicioAsync">

           </ul>
          </div>
        </div>
  `;
//Elementos del Dom creados en el contenedor nuevo y seleccionados para la practica
  const ejercicio = document.getElementById("ejercicio");
  const ejercicioAsync = document.getElementById("ejercicioAsync");

//peticion al servidor local a la ruta palabras
  fetch("http://localhost:3000/palabras")
  //convierte la peticion a un json
    .then((res) => res.json())
    //Paso a un formato entendiblie para el html el contenido de la respuesta resolviendo asi la promesa
    .then((data) => (ejercicio.innerHTML = JSON.stringify(data)));

//Creo una funcion asincrona la cual voy a usar para mostrar el contenido de la coleccion con un formato que me agrada mas 
  const ejercicio5 = async () => {
  //Espero la respuesta del servidor
    const res = await fetch("http://localhost:3000/palabras");
    //Espero la respuesta de la conversion de los datos obtenidos 
    const data = await res.json();
    
    //Desestructuro cada una de las palabras y voy concatenando el la lista desordenada cada uno de los contenidos de los resultados del servidor 
    data.map(
      ({ palabra }) =>
        (ejercicioAsync.innerHTML += `<li class="list-group-item">${palabra}</li>`)
    );
  };
  ejercicio5();
});
