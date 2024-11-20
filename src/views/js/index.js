const socket = io();

//Funciones desde el lado del cliente
function checkStatus(){
    console.log("Estado del socket:", socket.connected );
}
socket.on("connect", () =>{
    console.log("Sockets conectados");
    checkStatus()
})

socket.on("disconnect", () =>{
    console.log("Sockets desconectado");
    checkStatus()
})

//Eventos de reconexion 
socket.io.on("reconnect_attempt", () =>{
    console.log("Intentando reconectarme");
})

socket.io.on("reconnect", () =>{
    console.log("Conectado reconectarme");
})

//Error de conexion 
socket.on("connect_error", () =>{
    console.log("No se pudo conectarme");
})