class Persona {
    constructor(carta) {
        this.carta=carta;
    }
    generaCartaAleatoria(){
        const arrayPalos=[ "♠","♥" ,"♣","♦️"]
        const arrayNum=["1","2","3","4","5","6","7","8","9","10","Q","K","J","A"];

        let paloAleatorio= arrayPalos[Math.round(Math.random()*(arrayPalos.length-1))];
        let numAleatorio= arrayNum[Math.round(Math.random()*(arrayNum.length-1))];
        this.carta.push(numAleatorio.concat(paloAleatorio));
        console.log(this.carta);

    }
}

class Usuario extends Persona {

    constructor(dinero,usuario,pass,carta) {
        super(carta)
        this.dinero=dinero;
        this.usuario=usuario;
        this.pass=pass;

    }
}
class Cupier extends Persona {
    constructor(dinero,carta) {
        super(carta);
        this.dinero=dinero;
        
    }
}

class Carta {
    constructor(palo,numero,url) {
        this.palo=palo;
        this.numero=numero;
        this.url=url;
    }

}

const jose=new Usuario(300,"Jarmoreno",1231231,[]);

jose.generaCartaAleatoria();
jose.generaCartaAleatoria();
jose.generaCartaAleatoria();