const socket = io();

//Recibir emision
socket.on("welcome", data =>{
    text.textContent = data;
})

//Emitir evento al servidor 
const emit_var = document.querySelector("#emit-to-server");

emit_var.addEventListener("click", () =>{
    socket.emit("hello", "world");
});

//Recibir de todos
socket.on("all", message =>{
    console.log(message);
})


//Emitir mensaje 
const emit_to_last = document.querySelector("#emit-to-last");

emit_to_last.addEventListener("click", () =>{
    socket.emit("last", "Hola ");
});

//Recibir
socket.on("saludate", message =>{
    console.log(message);
})
