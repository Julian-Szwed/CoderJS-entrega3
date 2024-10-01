const divPrecio = document.querySelector("#precioTotal")
const tableBody = document.querySelector(".tableBody")
const especialistaElegido = JSON.parse(localStorage.getItem("misServicios")) || []
if (especialistaElegido) {
    armarFilaHTML()
}

const total = document.querySelector(".total")
const botonQuitar = document.querySelectorAll(".quitar")
const botonFinalizar = document.querySelector(".finalizar")


function armarFilaHTML(){
    tableBody.innerHTML = ""
    const serTable = document.createElement("div")
    especialistaElegido.forEach((ser) => {
        serTable.innerHTML +=
        `<tr>
        <img src= ${ser.imagen}>
        <td>${ser.nombre}</td>
        <td>${ser.precio * ser.cantidad} (${ser.cantidad})</td>
        <td><button onclick="activarClickEnBotonQuitar(${ser.codigo})"class="quitar button btn">Quitar</button></td>
        </tr>`

        tableBody.appendChild(serTable)
    })
    incluirTotal()
}

function activarClickEnBotonQuitar(id) {
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
    let cont = 0
    especialistaElegido.forEach((ser) => {
        cont += ser.precio * ser.cantidad
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
            Swal.fire({
                icon: "success",
                title: "Turno registrado",
                text: "Su turno fue registrado con extio"
            })
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

/*let nombre = document.getElementById("nombre").value
let apellido = document.getElementById("apellido").value
let telefono = document.getElementById("telefono").value
let email = document.getElementById("email").value

let turnoDatos = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    email:email
}*/