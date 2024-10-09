const express=require('express');
const app=express();
const cors=require("cors")
const port = 3000;
const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/users')
                    .then(()=>console.log("Conexión con la base de datos hecha")).catch(err=>console.log(err));


const esquemaUsuario= new mongoose.Schema({
    nombre:{type:String},
    pass:{type:String},
    dinero:{type:Number},
    partidasGanadas:{type:Number},
});

                
const Usuario=mongoose.model("Usuario",esquemaUsuario);


app.use(cors())
app.use(express.json());




app.get("/12",(req,res)=>{


    res.send(console.clear());
});

app.get("/obtieneDatosJugador",async (req,res)=>{
    const id =req.body.id;

    const usuario= await Usuario.findOne({_id:id})

    res.json(usuario.toJSON())
        
});


app.post("/enviaDatos",(req,res)=>{
    
    const datosJugador=req.body;

    res.json({ mensaje: 'Juego iniciado', datos: data })
});

app.post("/creaJugador",async (req,res)=>{

    const datosJugador=req.body;

        const usuario=new Usuario({
            nombre:datosJugador.usuario,
            dinero:datosJugador.dinero,
            pass:datosJugador.pass

        });

    const usuarioGuardado= await usuario.save();
    res.send(usuarioGuardado.toJSON());
    console.log(usuarioGuardado);
}

)

app.listen(port,()=>console.log("Server iniciado"));




