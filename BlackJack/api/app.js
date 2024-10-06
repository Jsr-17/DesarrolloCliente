const express=require('express');
const app=express();
const cors=require("cors")
const port = 100;

app.use(cors())
app.use(express.json());




app.get("/",(req,res)=>{

    res.send("Pegale al borracho una pata en la polla")
});

app.post("/envia-datos",(req,res)=>{
    
    data=req.body;

    //const datosJugador=data.filter((value)=>!value.usuario.includes("Invitado"));
    console.log(data);
    //console.log(datosJugador);

    res.json({ mensaje: 'Juego iniciado', datos: data })
});

app.listen(port,()=>console.log("Server iniciado"));