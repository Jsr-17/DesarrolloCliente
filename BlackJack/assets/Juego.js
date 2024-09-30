//Constructor principal de la clase donde la logica del juego va a ser diseñada
export class Juego {
    constructor(carta,suma) {
        this.carta = carta;
        this.suma = suma;
    }
    //Este método se encarga de generar las cartas aleatorias,hacer la llamada a la suma y guardar las cartas
    juegaCartas() {
        const arrayPalos = ["♠", "♥", "♣", "♦️"]
        const arrayNum = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "K", "J", "A"];

        //Genera cartas alatorias

        let paloAleatorio = arrayPalos[Math.round(Math.random() * (arrayPalos.length - 1))];
        let numAleatorio = arrayNum[Math.round(Math.random() * (arrayNum.length - 1))];

        //Almaceno la carta
        this.carta.push(numAleatorio.concat(paloAleatorio));
        //Almaceno la suma 
        this.suma=this.sumaCartas();
    }
    //Este método se encarga de hacer la suma de las cartas 
    sumaCartas() {
        //Me quedo con el valor numeral de cada carta 
        let valorNumeral = this.carta.map((value) =>{
            //El 10 al ser un numero compuesto tengo que tener mas cuidado con el si no solo saco el 1 
            if (value.includes("10")) {
                return "10";
            }
            return value[0]
        });
        //Saco los valores de caracteres al valor 10

        for (let index = 0; index < valorNumeral.length; index++) {
            if (valorNumeral[index] == "Q" || valorNumeral[index] == "K" || valorNumeral[index] == "J") {
                valorNumeral[index] = "10";
            }
        }
        //Registro la posición del comodín en el caso de que aparezca

        let comodin=valorNumeral.indexOf("A");

        //Si el comodín aparece entonces lo guardo en la última posición del array para tener control sobre el 
        //Como es un string no puede ser convertido a int aún

        if (comodin != -1) {
            let as=valorNumeral[comodin];
            valorNumeral.splice(comodin,1);
            valorNumeral.push(as);
        }
        //Convierto cada numero distinto al comodin a número
        let valorNumerico=valorNumeral.map((value)=>value != "A" ? parseInt(value) : value);

        //Aplico la suma donde también incluyo el caso del comodín el cual según el contexto suma 11 o solo 1
        let total=valorNumerico.reduce((suma,valor)=>valor !="A" ? suma+=valor: suma+11<=21 ? suma+11 : suma+1);

        //Devuelvo el valor de la suma
        return total
    }
}
//Clase del o los usuarios que jugaran

export class Usuario extends Juego {

    constructor(dinero, usuario, pass, carta,suma) {
        super(carta,suma)
        this.dinero = dinero;
        this.usuario = usuario;
        this.pass = pass;

    }
}
//Clase del Cupier el cual sera la banca 
export class Cupier extends Juego {
    constructor(dinero, carta,personas,suma) {
        super(carta,suma);
        this.dinero = dinero;
        this.personas = personas;
    }
}
//Clase de las Cartas
export class Cartas {
    constructor( url,cartas,jug) {
        this.url = url;
        this.cartas=cartas;
        this.jug = jug;
    }
    
    //Método encargado de obtener el valor de las cartas que van saliendo para poder mostrarlas luego por pantalla

    muestraCartas(){
        const carta=document.getElementById(this.jug.id);
        let urlCartas=this.cartas.map((value)=>value="./assets/img/"+value+".png");
        console.log(carta);
        this.url.push(...urlCartas);

        for (let index = 0; index < this.url.length; index++) {
            const img = document.createElement("img");
            img.src=this.url[index];
            carta.appendChild(img);
        }
    }

}