//Importar express, http y socket 
const express = require("express");
const {createServer} = require("http");
const path = require("path");
const {Server} = require("socket.io");

const app  = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


//Archivos estaticos
app.use(express.static(path.join(__dirname, "views")))


app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

//Conexion socket
io.on("connection", socket=>{
    
    //Recibir evento del circulo
    socket.on("circle position", position =>{
        // //Enviar evento a todos
        // io.emit("move circle", position)

        //Enviar a todo menos a mi
        socket.broadcast.emit("move circle", position)
    })


  
})


httpServer.listen(3000)