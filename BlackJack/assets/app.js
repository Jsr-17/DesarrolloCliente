class Juego {
    constructor(carta,suma) {
        this.carta = carta;
        this.suma = suma;
    }
    juegaCartas() {
        const arrayPalos = ["♠", "♥", "♣", "♦️"]
        const arrayNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "K", "J", "A"];

        let paloAleatorio = arrayPalos[Math.round(Math.random() * (arrayPalos.length - 1))];
        let numAleatorio = arrayNum[Math.round(Math.random() * (arrayNum.length - 1))];
        this.carta.push(numAleatorio.concat(paloAleatorio));
        this.suma=this.sumaCartas();
    }
    sumaCartas() {
        let valorNumeral = this.carta.map((value) => value[0]);

        for (let index = 0; index < valorNumeral.length; index++) {
            if (valorNumeral[index] == "Q" || valorNumeral[index] == "K" || valorNumeral[index] == "J") {
                valorNumeral[index] = "10";
            }
        }

        let comodin=valorNumeral.indexOf("A");

        if (comodin != -1) {
            let as=valorNumeral[comodin];
            valorNumeral.splice(comodin,1);
            valorNumeral.push(as);
        }

        let valorNumerico=valorNumeral.map((value)=>value != "A"? parseInt(value) : value);
        
        let total=valorNumerico.reduce((suma,valor)=>valor!="A" ? suma+=valor: suma+10<=21 ? suma+10 : suma+1);

        return total
    }
}

class Usuario extends Juego {

    constructor(dinero, usuario, pass, carta,suma) {
        super(carta,suma)
        this.dinero = dinero;
        this.usuario = usuario;
        this.pass = pass;

    }
}
class Cupier extends Juego {
    constructor(dinero, carta, Persona, Personas,suma) {
        super(carta,suma);
        this.dinero = dinero;
        this.Persona = Persona;
        this.Personas = Personas;
    }
}

class Cartas {
    constructor( url,cartas) {
        this.url = url;
        this.cartas=cartas;
    }
    muestraCartas(){
        let urlCartas=this.cartas.map((value)=>value="img/"+value+".jpg"    )

        this.url.push(urlCartas);
        console.log(this.url)
    }

}

const jose = new Usuario(300, "Jarmoreno", 1231231, []);
const cartaJose =new Cartas([],jose.carta)

jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
jose.juegaCartas();
cartaJose.muestraCartas();
