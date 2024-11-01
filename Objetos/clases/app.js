class Persona {
  //Definicion de propiedades
  comida = "";
  nombre = "";
  codigo = "";
  frase = "";
  //definicion del constructor
  constructor(
    nombre = "sin Frase",
    codigo = "Sin codigo",
    frase = "Sin frase"
  ) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.frase = frase;
  }
  //getter y setters
  //los set son para validaciones o ejecutar codigo adicional en la propieada
  set setComidaFavorita(comida) {
    comida = this.comida.toUpperCase();
  }
  get getComidaFavorita() {
    return "esta es su comida favorita " + this.comida;
  }

  //metodos
  quienSoy() {
    console.log(`Soy ${this.codigo} y mi frase es ${this.frase}`);
  }
  fraseConNombre() {
    console.log(`Mi nombre es ${this.nombre}`);
  }
}
const spiderman = new Persona(
  "Peter Parker",
  "Spiderman",
  "Un gran poder conlleva una gran responsabilidad"
);

console.log(spiderman);

spiderman.quienSoy();
spiderman.fraseConNombre();
spiderman.setComidaFavorita = "Jamon";
