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
    console.log(socket.id)
})

httpServer.listen(3000)