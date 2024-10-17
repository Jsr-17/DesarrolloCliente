
//Variables y referencias del DOM
let listadoAlumno=[];
const input=document.querySelectorAll("input");
const btn=document.querySelectorAll("button");

//Definicion de los objetos

function Alumno(nombre,apellido,edad,telefono,nivel) {
    this.nombre=nombre;
    this.apellido=apellido;
    this.edad=edad;
    this.telefono=telefono;
    this.nivel=nivel;
}

//limpiar form
const limpiar=()=>{
    for (let index = 0; index < input.length; index++) {
        input[index].value="";
        
    }
    //input.map(valor=>valor.value)
}

//Funcion agregar a un alumno

const onclickButton=(e)=>{
    e.preventDefault();
    const alumno=new Alumno(input[0].value,input[1].value,input[2].value,input[3].value,input[4].value);
    listadoAlumno=[...listadoAlumno,alumno];
    limpiar();

}

function mostrarAlumnos(e){
    e.preventDefault();
    let listado="";
    if (listadoAlumno.length==0) {
        alert("No hay alumnos");
        return;
    }

    for (let alu of listadoAlumno) {
        for (let key in alu) {
            listado+= key+" : "+alu[key]+" ";
        }
        listado+="\n";
    }
        alert(listado);
    }


btn[0].addEventListener("click",(e)=>onclickButton(e));
btn[1].addEventListener("click",(e)=>mostrarAlumnos(e));