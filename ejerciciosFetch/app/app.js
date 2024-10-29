//variables globales
const contenedor = document.querySelector("#content");
const ejecutar1 = document.querySelector("#Ejecutar1");
const ejecutar2 = document.querySelector("#Ejecutar2");
const ejecutar3 = document.querySelector("#Ejecutar3");
const ejecutar4 = document.querySelector("#Ejecutar4");

//----------------------------------------------------------------------Ejercicio 1--------------------------------------------------------------------

ejecutar1.addEventListener("click", () => {
  contenedor.innerHTML = `
  <div class="row">
        <p class="mb-2">
            <h4>Ejercicio-1</h4>
          Mediante la dirección web:
          Https://apis.datos.gob.ar/georef/api/provincias Se nos retorna un
          objeto JSON con la información de los nombres de las provincias de
          Argentina, su id etc. Recuperar mediante el API fetch los datos y
          mostrarlos.
          <span class="m-3">
          <button id="ejecutar" class="btn btn-outline-primary ms-3">Ejecutar codigo </button>
          </span>

                  
        </p>
        <div class="col col-5 border border-2 border-black text-center">
          <h5 class="m-4">-Ejercicio 1</h5>

          <pre id="ejercicio"></pre>
        </div>
        <div class="col-1"></div>
        <div class="border border-2 border-black col col-5 text-center">
          <h5 class="m-4">-Ejercicio 1 (Async)</h5>
          <ul id="ejercicioAsync" class="list-group"></ul>
        </div>
      </div>`;

  let resultado = document.querySelector("#ejercicio");
  let resultadoAsync = document.querySelector("#ejercicioAsync");
  let ejecutar = document.querySelector("#ejecutar");

  ejecutar.addEventListener("click", () => {
    //Ejercicio numero 1
    //version .then()

    fetch(" Https://apis.datos.gob.ar/georef/api/provincias ")
      .then((resp) => resp.json())
      .then((data) => (resultado.textContent = JSON.stringify(data, null, 2)))
      .catch((err) => console.log(err));

    fetch(" Https://apis.datos.gob.ar/georef/api/provincias ")
      .then((resp) => resp.json())
      .then((data) => {
        data.provincias.map((data) => console.log(data));
      })
      .catch((err) => console.log(err));

    //Ejemplo con async

    const Ejercicio1Async = async () => {
      const resp = await fetch(
        " Https://apis.datos.gob.ar/georef/api/provincias "
      );
      const { provincias } = await resp.json();
      provincias.map(
        ({ nombre }) =>
          (resultadoAsync.innerHTML += `<li class="mt-2 list-group-item">${nombre}</li>`)
      );
    };
    Ejercicio1Async();
  });
});

//------------------------------------------------------------------------Ejercicio 2-------------------------------------------------------------------------

ejecutar2.addEventListener("click", () => {
  contenedor.innerHTML = `
  <div class="row">
            <p class="mb-2">
                <h4>Ejercicio-2</h4>
                Hay muchas empresas y organismos públicos que hacen públicos sus datos y permiten que
                otros sitios web y aplicaciones puedan consultar dicha información.
                Con el API fetch podemos fácilmente acceder a las API que suministran otros sitios web.
                Veamos con un ejemplo como consumimos del sitio jsonplaceholder.typicode.com/ datos
                ficticios sobre 10 usuarios.
                Debemos conocer dos cosas para poder consumir los datos:
                <br>
                1. La URL que nos suministra el recurso, en nuestro caso es:
                <br>
                2. https://jsonplaceholder.typicode.com/users
                
              <span class="mt-2">
              <button id="ejecutar" class="btn btn-outline-primary ms-3 mt-3">Ejecutar codigo </button>
              </span>
    
                      
            </p>
            <div class="col col-5 border border-2 border-black">
              <h5 class="m-4">-Ejercicio 2</h5>
    
              <pre id="ejercicio"></pre>
            </div>
            <div class="col-1"></div>
            <div class="border border-2 border-black col col-5 ">
                <div class="container">
                    <h5 class="m-4">-Ejercicio 2 (Async)</h5>
                    <div class="row mt-5 text-center">
                        <div class="col-6">
                            <form id="form" class="form-group">
                                <p>Clave</p>
                                <hr>
                            <input type="text" id="clave" class="my-3 form-control">
                            <p> Valor</p>
                            <hr>
                            <input type="text" id="valor" class="my-3 form-control">
                            <button class="my-3 btn btn-outline-warning">Enviar consulta</button>
                            </form>
                            
                          </div>
                          <ul id="ejercicioAsync" class="list-group col-6"></ul>
                        </div>
                    </div>

                </div>

          </div>`;
  let ejecutar = document.querySelector("#ejecutar");

  ejecutar.addEventListener("click", () => {
    //Ejercicio 2
    let resultado = document.querySelector("#ejercicio");
    let resultadoAsync = document.querySelector("#ejercicioAsync");
    let form = document.querySelector("#form");
    let clave = document.querySelector("#clave");
    let valor = document.querySelector("#valor");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((data) => (resultado.innerHTML = JSON.stringify(data, null, 2)))
      .catch((err) => err);

    //Ejercicio 2 Async

    const Ejercicio2Async = async (prop, dato) => {
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await resp.json();
        const objResultado = data.find((user) => user[prop] == dato);
        if (objResultado === undefined) {
          resultadoAsync.innerHTML = "<p>Datos no válidos</p>";
          return;
        }

        const {
          name,
          username,
          email,
          address: { street, city },
        } = objResultado;

        resultadoAsync.innerHTML = `
              <div class="mt-2" >
              Encontrados los siguientes datos:
              <ul>
              <li>Nombre: ${name}</li>
              <li>Usuario: ${username}</li>
              <li>Email: ${email}</li>
              <li>Calle: ${street}</li>
              <li>Ciudad: ${city}</li>
              </ul>
              </div>
            
              `;
      } catch (error) {
        console.log(error);
      }
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Ejercicio2Async(clave.value, valor.value);
    });
  });
});

//------------------------------------------------------------------------Ejercicio 3-------------------------------------------------------------------------

ejecutar3.addEventListener("click", () => {
  contenedor.innerHTML = `     
   <div class="row">
        <h4>Ejercicio-3</h4>
        <p>
          Mediante la dirección web: https://freegeoip.app/json/ freegeoip.app
          nos proporciona una API de geolocalización IP. Utiliza una base de
          datos de direcciones IP asociadas a ciudades junto con otra
          información relevante como zona horaria, latitud y longitud. La
          estructura del archivo JSON es: <pre>
            {
                "ip":"186.123.122.56","country_code":"AR", "country_name":"Argentina",
                "region_code":"X", "region_name":"Córdoba", "city":"Córdoba",
                "zip_code":"5000", "time_zone":"America/Argentina/Cordoba",
                "latitude":-31.4015, "longitude":-64.1803, "metro_code":0
            }
        </pre>
         Mostrar en
          la página el nombre del país, ciudad, código postal e ip
        </p>
                      <span class="my-3">
              <button id="ejecutar" class="btn btn-outline-primary ms-3 mt-3">Ejecutar codigo </button>
              </span>
      </div>
      <div class="container">
      <div class="row text-center">
            <div class="col-5 border border-2 border-black">
                <h4 class="m-4">Ejercicio-3</h4>
                <div id="ejercicio" class="mb-2"></div>
            </div>
            <div class="col-1"></div>
        
            <div class="col-6  border border-2 border-black">
                <h4 class="m-4">Ejercicio-3 (Async)</h4>
                <ul id="ejercicioAsync"></ul>

            </div>
        </div>
      </div>`;

  let ejecutar = document.querySelector("#ejecutar");

  ejecutar.addEventListener("click", () => {
    //Ejercicio 3
    let resultado = document.querySelector("#ejercicio");
    let resultadoAsync = document.querySelector("#ejercicioAsync");

    fetch("https://api.ipbase.com/v1/json/")
      .then((resp) => resp.json())
      .then((data) => (resultado.innerHTML = JSON.stringify(data, null, 2)));

    //Ejercicio 3 Async

    const ejercicio4Async = async () => {
      const resp = await fetch("https://api.ipbase.com/v1/json/");
      const data = await resp.json();
      const { country_name, city, zip_code, ip } = data;
      resultadoAsync.innerHTML = `
      <li class="list-group-item">Nombre pais :${country_name}</li>
      <li class="list-group-item">Ciudad: ${city}</li>
      <li class="list-group-item">Código Postal: ${zip_code}</li>
      <li class="list-group-item">Direccion Ip: ${ip}</li>
        `;
    };
    ejercicio4Async();
  });
});

ejecutar4.addEventListener("click", () => {
  contenedor.innerHTML = `
<div class="row">
        <h4>Ejercicio-4</h4>
        <p>
          Mediante la dirección web: https://jsonplaceholder.typicode.com/users
          <br />
          Recuperamos los datos de un usuario en particular. <br />
          Ingresar en un formulario el id de un usuario y al presionar un botón
          mostrar los datos del mismo.
        </p>
      </div>

      <div class="row">
        <div class="col-4">
          <h5>Introduzca el id del usuario</h5>
          <form class="form-group" id="form">
            <input type="number" class="form-control mt-4" id="numero" />
            <button class="btn btn-outline-primary mt-3">Consultar</button>
          </form>
        </div>
        <div class="col-2"></div>
        <div class="col-6">
          <pre id="ejercicio"></pre>
        </div>
      </div>
`;

  const formulario = document.querySelector("#form");
  const numero = document.querySelector("#numero");

  const resultado = document.querySelector("#ejercicio");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        let dato = data.find(({ id }) => id == numero.value);
        if (!dato) {
          resultado.innerHTML = "Valor no valido";
          return;
        }
        resultado.innerHTML = JSON.stringify(dato, null, 2);
      })
      .catch((err) => console.log(err));
  });
});
