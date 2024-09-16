const divPrecio = document.querySelector("#precioTotal")
const tableBody = document.querySelector(".tableBody")
const especialistaElegido = JSON.parse(localStorage.getItem("misServicios")) || []
if (especialistaElegido) {
    armarFilaHTML()
}

const total = document.querySelector(".total")
const botonesQuitar = document.querySelectorAll(".quitar")
const botonFinalizar = document.querySelector(".finalizar")

function armarFilaHTML(){
    tableBody.innerHTML = ""
    const serTable = document.createElement("div")
    especialistaElegido.forEach((ser) => {
        serTable.innerHTML +=
        `<tr>
        <img src= ${ser.imagen}>
        <td>${ser.nombre}</td>
        <td>${ser.precio}</td>
        <td><button onclick="activarClickEnBotonesQuitar(${ser.codigo})"class="quitar button btn">Quitar</button></td>
        </tr>`

        tableBody.appendChild(serTable)
    })
    incluirTotal()
}

function activarClickEnBotonesQuitar(id) {
    let especialistaEliminado = especialistaElegido.find((especialista) => especialista.codigo === id)
    if (especialistaEliminado) {
        const posicion = especialistaElegido.indexOf(especialistaEliminado)
        especialistaElegido.splice(posicion, 1)
        armarFilaHTML()
        Swal.fire({
            icon: "error",
            title: "Eliminado"
        })
    }
}

function incluirTotal(){
    let cont = ""
    especialistaElegido.forEach((ser) => {
        cont += ser.precio
    })

divPrecio.innerHTML = `Total: $${cont}`
}

const activarClickEnBotonFinalizar = () => {
    botonFinalizar.addEventListener("click", () => {
        if (especialistaElegido.length > 0) {
            mostrarMensaje("Su turno fue aceptado, Muchas gracias.")
            tableBody.innerHTML = ""
            divPrecio.innerHTML = ""
            localStorage.clear ()
            console.log(localStorage)
        } else {
            mostrarMensaje("No se ha elegido ningun turno. Vuelva a inicio y elija un turno correspondiente.")
        }
    })
}

activarClickEnBotonFinalizar()
const mostrarMensaje = (msg) => {
    const mensaje = document.querySelector("p.mensaje")
    mensaje.textContent = msg
}