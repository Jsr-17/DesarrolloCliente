class Helicoptero {
    constructor(aspas,cristal,zapatos) {
        this.aspas=aspas;
        this.cristal=cristal;
        this.zapatos=zapatos;
    }

}



Helicoptero.prototype.declararMigenero=()=>alert("Mi genero es de un helicoptero apache de combate mira mis aspas"+this.aspas);


const juan= new Helicoptero(2,3,2);
juan.declararMigenero();



class  Bicicleta  extends Helicoptero{
    constructor(aspas,zapatos,cristal,madera) {
        super(aspas,cristal,zapatos)
        this.madera=madera;

    }
}

const bici=new Bicicleta(2,4,5,4);
bici.declararMigenero();
