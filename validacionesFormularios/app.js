const formulario = document.getElementById("form");

const nombreInput = document.getElementById("nombre");
const nombreIncorrecto = document.getElementById("nombreIncorrecto");

const contrasenyaInput = document.getElementById("contrasenya");
const contrasenyaIncorrecta = document.getElementById("contrasenyaIncorrecta");

const emailInput = document.getElementById("email");
const emailIncorrecto = document.getElementById("emailIncorrecto");

const telefonoInput = document.getElementById("telefono");
const telefonoIncorrecto = document.getElementById("telefonoIncorrecto");

const fechaInput = document.getElementById("fecha");
const fechaIncorrecta = document.getElementById("fechaIncorrecta");

const radBtn = document.getElementsByName("radioB");
const errorRadBtn = document.getElementById("errorRadio");

const checkbox = document.getElementById("aceptaCondiciones");
const errorCheck = document.getElementById("errorCheck");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(fechaInput.value);
  validacionInput(
    nombreInput,
    /\D([a-zA-Z éáóíú]){3,}/,
    nombreIncorrecto,
    "nombre"
  );
  validacionInput(
    emailInput,
    /([a-zA-z-_0-9]+)@([a-zA-Z])+\.([a-zA-Z.-])+([a-zA-z])?/,
    emailIncorrecto,
    "email"
  );
  validacionInput(telefonoInput, /[0-9]{9}/, telefonoIncorrecto, "telefono");
  validacionInput(
    fechaInput,
    /(\d{1,4})[\/\-](\d{1,2})[\/\-](\d{1,4})/,
    fechaIncorrecta,
    "Fecha"
  );
  validacionInput(
    contrasenyaInput,
    /(?=.+[a-z]){1,}(?=.+[A-Z]{1,})(?=.+[0-9]{1,})(?=.+[@\-_.]{1,})[A-Za-z0-9@\-_.]{8,}/,
    contrasenyaIncorrecta,
    "Contraseña"
  );
  let seleccionado;

  radBtn.forEach((element) => {
    if (element.checked) {
      seleccionado = element.id;
    }
  });
  if (!seleccionado) {
    errorRadBtn.textContent = "El campo sexo no cumple las exigencias";
  } else {
    errorRadBtn.textContent = "";
  }
  if (!checkbox.checked) {
    console.log("entra");
    errorCheck.textContent = "Debe aceptar las condiciones para continuar";
  } else {
    errorCheck.textContent = "";
  }
});
//funcion para hacer las validaciones
const validacionInput = (input, expresion, mensajeError, campo) => {
  //limpia los espacios del formulario
  input.value.trim();

  //si no pasa por la validacion los valores
  if (!expresion.test(input.value)) {
    mensajeError.textContent = `El campo ${campo} no cumple las exigencias`;
    return;
  } else {
    //quita el mensaje de error
    mensajeError.textContent = "";
  }
};
