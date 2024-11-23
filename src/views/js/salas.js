const socket = io();

const room1 = document.querySelector("#connectRoom1");
const room2 = document.querySelector("#connectRoom2");
const room3 = document.querySelector("#connectRoom3");

//Evento para al hacer click unir a la sala
room1.addEventListener("click", () =>{

    socket.emit("connect to room", "room1")
})

//Evento para al hacer click unir a la sala
room2.addEventListener("click", () =>{

    socket.emit("connect to room", "room2")
})


//Evento para al hacer click unir a la sala
room3.addEventListener("click", () =>{

    socket.emit("connect to room", "room3")
})



//Enviar mensaje
const sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener("click", () =>{
    const message = prompt("Escribe tu mensaje");
    socket.emit("message", message);
})

//Recibir mensaje
socket.on("send message", data =>{
    const {room} = data;
    const {message} = data;

    const li = document.createElement("li");
    li.textContent = message;
    document.querySelector(`#${room}`).append(li);
})