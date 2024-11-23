//Activar el debuggin
process.env.DEBUG = "socket.io:socket";


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

app.get('/salas', (req,res)=>{
    res.sendFile(__dirname + "/views/salas.html");
})

app.get('/chat', (req,res)=>{
    res.sendFile(__dirname + "/views/chat.html");
})

//Ejecutar un middleware antes de la conexion
io.use((socket, next) =>{
    
    const token = socket.handshake.auth.token;

    if (token == "hola") {
        next();
    }else{
        const err = new Error("No puede pasar")
        err.data = {
            details: "No pudo ser autenticado"
        }
        next(err)
    }
});

//Conexion socket
io.on("connection", socket=>{
    
    socket.connectedRoom = "";

    //Recibir evento del circulo
    socket.on("circle position", position =>{
        // //Enviar evento a todos
        // io.emit("move circle", position)

        //Enviar a todo menos a mi
        socket.broadcast.emit("move circle", position)
    })

    //Recibir evento de salas
    socket.on("connect to room", room =>{
        socket.leave(socket.connectedRoom);
        switch (room) {
            case "room1":
                socket.join("room1")
                socket.connectedRoom = "room1";
            break;
        
            case "room2":
                socket.join("room2")
                socket.connectedRoom = "room2";
            break;

            case "room3":
                socket.join("room3")
                socket.connectedRoom = "room3";
            break;
            default:
            break;
        }
    })

    socket.on("message", message =>{
        const room = socket.connectedRoom;

        io.to(room).emit("send message", {
            message,
            room
        })

    })
  
})

//Crear los namesspaces
const teachers = io.of("teachers")
const students = io.of("students")

//Conectar
teachers.on("connection", socket =>{
    console.log(socket.id + "se ha conectado a la sala de profes");

    socket.on("send message", data =>{
        teachers.emit("message", data);
    });
})

students.on("connection", socket =>{
    console.log(socket.id + "se ha conectado a la sala de estudiantes");
    
    socket.on("send message", data =>{
        students.emit("message", data);
    })
})
httpServer.listen(3000)