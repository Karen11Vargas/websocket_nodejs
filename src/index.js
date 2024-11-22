//Importar express, http y socket 
const express = require("express");
const {createServer} = require("http");
const path = require("path");
const {Server} = require("socket.io");

const app  = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const socketsOnline = [];

//Archivos estaticos
app.use(express.static(path.join(__dirname, "views")))


app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

//Conexion socket
io.on("connection", socket=>{
    
    //Guardar socket conectado 
    socketsOnline.push(socket.id);

    //Emision basica
    socket.emit("welcome", "Ahora estas conectado");

    //Recibir emision 
    socket.on("hello", (arg) => {
        console.log(arg); // world
    });

    //Enviar a todos
    io.emit("all", "Hola a todos" + socket.id)

    //Recibir evento
    socket.on("last", message =>{

        const lastSocket = socketsOnline[socketsOnline.length - 1];

        //emitir saludo a solo un socket 
        io.to(lastSocket).emit("saludate", message);
    })
})


httpServer.listen(3000)