const express=require('express');
const app=express();
const cors=require("cors")
const port = 2000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/usuarios').then(()=>console.log("Conectado a base datos")).catch((err)=>console.log(err));



const EsquemaUsuario=mongoose.Schema({nombre:{type:String},
                                pass:{type:String},
                                partidasGanadas:{type:Number},
                                dinero:{type:Number}
                            });
const Usuario=mongoose.model("Uusuario",EsquemaUsuario);


app.use(cors());
app.use(express.json());




app.get("/12",async (req,res)=>{

    const{nombre,pass,partida,dinero}=req.query;
console.log(nombre);

    const usuario=new Usuario({
        nombre:nombre,
        pass:pass,
        partidasGanadas:partida,
        dinero:dinero        
    })

    await usuario.save();

    res.send("Usuario guardado");

});
app.get("/verMiscosas", async (req,res)=>{
    const data = req.query; // Esto obtiene los parámetros de consulta

    try {
      // Utiliza el contenido de 'data' como criterio de búsqueda
      const dato = await Usuario.findOne(data).select('pass');
  
      if (dato) {
        res.send(dato); // Envía el resultado al cliente como JSON
      } else {
        res.status(404).send('Usuario no encontrado');
      }
  
      console.log(dato); // Esto mostrará el dato encontrado en la consola del servidor
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al buscar los datos');
    }
})

app.post("/envia-datos",(req,res)=>{
    
    data=req.body;

    //const datosJugador=data.filter((value)=>!value.usuario.includes("Invitado"));
    //console.log(data);
    //console.log(datosJugador);


    res.json({ mensaje: 'Juego iniciado', datos: data });
});

app.listen(port,()=>console.log("Server iniciado"));




