
//Saber que rol cumple la persona que se esta conectando
const user = prompt("Escribe tu usuario");

const profes = ["Karen", "Luz", "Miranda"];

let socketNameSpace, group;

const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");

if (profes.includes(user)) {

    //Conectar socket de teachers 
    socketNameSpace = io("/teachers")
    group = "teachers";
}else{
      //Conectar socket de estudiantes 
      socketNameSpace = io("/students")
      group = "students";
}

//Parametrizar el nombre del grupo
socketNameSpace.on("connect", () =>{
    namespace.textContent = group
})

//Logica envio mensajes
const sendMessahe = document.querySelector("#send");
sendMessahe.addEventListener("click", ()=>{
    const message = prompt("Escriba el mensaje: ");
    socketNameSpace.emit("send message", {
        message, user
    })
})

//Recibir evento
socketNameSpace.on("message", data =>{
    const {user, message} = data;
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;

    chat.append(li);
})