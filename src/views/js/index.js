const socket = io();
const circle = document.querySelector('#circle')


// mover circulo
const drawCircle = position =>{
    circle.style.top = position.top
    circle.style.left = position.left
}

// capturar posiciones
const drag = (e) => {
 
  const position = {
    top: e.clientY + 'px',
    left : e.clientX + 'px'
  }

  drawCircle(position)
  socket.emit("circle position", position);

}

// se mueve cuando el mouse este presionado
document.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', drag)
})

// se deja de mover cuando se levante el mouse
document.addEventListener('mouseup', (e) => {
  document.removeEventListener('mousemove', drag)
})

//Escuchar evento de mover el circulo
socket.on("move circle", position =>{
  drawCircle(position)
})
