const btn = document.querySelector("button");
const div = document.querySelector("#contenedor");

let counter = 0;



function Automovil(marca, modelo, color, anio, titular) {
    this.marca = marca;
    this.titular = titular;
    this.modelo = modelo;
    this.color = color;
    this.anio = anio;
}

//Instancias de coches
const coche = new Automovil("Toyota", "Corolla", "Azul", 2020, "Carlos Pérez");
const coche2 = new Automovil("Ford", "Mustang", "Rojo", 2018, "Ana García");
const coche3 = new Automovil("Tesla", "Model 3", "Blanco", 2022, "Luis Rodríguez");


//Creación de metodos para el ejercicio

Automovil.prototype.venderAutomovil = function (value) {
    this.titular = value;
}
Automovil.prototype.verAuto = function () {
    return (`<ol>
        <li> Marca- ${this.marca}</li>
        <li> Modelo- ${this.modelo} </li>
        <li> Anio- ${this.anio} </li>
        <li> Titular- ${this.titular}</li>
         </ol>
         `)
}

//En este caso si puedo hacer uso de la arrow funtion por que no me molesta la pérdida de la referencia del this
Automovil.prototype.encender = () => {
    alert("El automóvil esta en marcha")
}

//Array con los coches
const arrCoches = [coche, coche2, coche3]

//Evento para añadir coches por pura preferencia personal he decidido hacerlo de uno en uno para que el usuario le tenga que dar varias veces y para que
//fuese mas sencillo directamente los he metido dentro del contenedor en vez de crear los elementos 
btn.addEventListener("click", () => {
        div.innerHTML +=`<h5>El coche número ${counter+1} es:  </h5>`

        div.innerHTML += arrCoches[counter].verAuto();
        counter++;
        if (counter == 3) {
            btn.style.display = "none";
        }
    })