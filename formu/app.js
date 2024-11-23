document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("formulario").addEventListener('submit', validar);
});

function validar(evento) {
    evento.preventDefault();
    const regex_usu= /^.{4,}$/g
    let usu =document.getElementById('usuario').value;
    
    if (!regex_usu.test(usu)) {
        alert ('Minimo 4 letras')
        return false
    }
    const regex_clave=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let clave =document.getElementById('clave').value;
    if (!regex_clave.test(clave))
    {
        alert('no cumple los requisitos');
        return false;
    }
    this.submit();
}