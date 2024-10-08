const express=require('express');
const app=express();
const cors=require("cors")
const port = 3000;
<<<<<<< HEAD
//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

=======
>>>>>>> 5532b5719a1f0814faca609c8b09da831e1e92f4

app.use(cors())
app.use(express.json());




app.get("/12",(req,res)=>{

<<<<<<< HEAD
    res.send("Tonto el que lo lea")
=======
    res.send("boba");
    console.clear();
>>>>>>> 5532b5719a1f0814faca609c8b09da831e1e92f4
});

app.post("/envia-datos",(req,res)=>{
    
    data=req.body;

    //const datosJugador=data.filter((value)=>!value.usuario.includes("Invitado"));
    console.log(data);
    //console.log(datosJugador);

    res.json({ mensaje: 'Juego iniciado', datos: data })
});

app.listen(port,()=>console.log("Server iniciado"));

/*const userSchema = new Schema({
    Usuario:{ type:String,required:true},
    created_at: { type: Date, default: Date.now },
    pass:{type:String,required:true},
    partidasGanadas:{type:Int}

  });


const User = mongoose.model('User', userSchema);*/