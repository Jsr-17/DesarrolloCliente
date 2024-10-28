const contenedorAhorcado = document.getElementById("content");
const ejecutar5 = document.getElementById("Ejecutar5");

ejecutar5.addEventListener("click", () => {
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

  const ejercicio = document.getElementById("ejercicio");
  const ejercicioAsync = document.getElementById("ejercicioAsync");

  fetch("http://localhost:3000/palabras")
    .then((res) => res.json())
    .then((data) => (ejercicio.innerHTML = JSON.stringify(data)));

  const ejercicio5 = async () => {
    const res = await fetch("http://localhost:3000/palabras");
    const data = await res.json();
    data.map(
      ({ palabra }) =>
        (ejercicioAsync.innerHTML += `<li class="list-group-item">${palabra}</li>`)
    );
  };
  ejercicio5();
});
