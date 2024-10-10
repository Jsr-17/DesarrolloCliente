//Importacion de librerias 
const express = require('express');
const app = express();
const cors = require("cors")
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users')
    .then(() => console.log("Conexión con la base de datos hecha")).catch(err => console.log(err));


const esquemaUsuario = new mongoose.Schema({
    usuario: { type: String },
    pass: { type: String },
    dinero: { type: Number },
    partidasGanadas: { type: Number },
});


const Usuario = mongoose.model("Usuario", esquemaUsuario);


app.use(cors());
app.use(express.json());




app.get("/clear", (req, res) => {

    console.clear();
});

app.get("/obtieneDatosJugador", async (req, res) => {
    const { usuario, pass } = req.query;

    try{
        const user = await Usuario.findOne({ usuario, pass });
        console.log(user);
        
        res.json(user);
    }catch(err){
        console.log(err);
    }
});


app.post("/enviaDatos", async (req, res) => {

    const { usuario, pass } = req.body;
    try {

        const user = await Usuario.findOne({ usuario });

        if (user.pass == pass) {

            res.status(200).send(user);
        }else{
            res.status(401).send();
        }

    } catch (err) {

        console.log(err);
    }
});

app.put("/actualizaDatos", async (req, res) => {

    const { usuario,dinero } = req.body;
    try {
            console.log(usuario,dinero);

        const user = await Usuario.findOneAndUpdate({ usuario },{dinero},{new:true});


        console.log(user);

        res.status(200).send(user);
       

    } catch (err) {

        console.log(err);
    }
});

app.post("/creaJugador", async (req, res) => {

    const { usuario, dinero, pass, partidasGanadas } = req.body;

    const datos = await Usuario.findOne({ usuario });

    if (!datos) {
        const guardarUsuario = new Usuario({
            usuario: usuario,
            dinero: dinero,
            pass: pass,
            partidasGanadas: partidasGanadas,

        });

        const user = await guardarUsuario.save();
        res.status(200).send();
    }else{
         res.status(409).send("El usuario ya existe");
    }
}

)

app.listen(port, () => console.log("Server iniciado"));