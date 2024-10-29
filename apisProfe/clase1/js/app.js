const peticion = fetch("https://jsonplaceholder.typicode.com/users")
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const pideDatos = async (id) => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await resp.json();
  const datos = data.filter((data) => id === data.id);
  console.log(datos);
};
pideDatos(6);
