//Importar express, http y socket 
const { Socket } = require("dgram");
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
    //Ver los sockets conectados
    console.log("Sockets conectados=>", io.engine.clientsCount);
    console.log(socket.id)

    //Se ejecuta cada vez que alguien se desconecte 
    socket.on("disconnect", () =>{
        console.log("El socket" + socket.id + "se ha desconectado.")
    })

    //Capturar updates de intentos de conexion 
    socket.conn.once("upgrade", () =>{
        console.log("Se ha pasado la conexion de HTTP Long-Polling a", socket.conn.transport.name);
        
    })

})


httpServer.listen(3000)