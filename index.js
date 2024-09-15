const servicio = []

const container = document.querySelector(".contenedor-cajas")
const imgServicio = document.querySelector(".imgServicio")

function elegirEspecialista() {
    container.innerHTML = ""
    medicos.forEach((especialista) => {
        container.innerHTML += `<div class="caja">
        <img class="d-block" src="${especialista.imagen}" alt="${especialista.nombre}">
        <h3 class="titulo-servicio text-center">${especialista.nombre}</h3>
        <p class="parrafo-servicio text-center">$${especialista.precio}</p>
        <button onclick="agregarServicio(${especialista.codigo})" class="button-elegir">Elegir</button>
        </div>`
    })
}

elegirEspecialista()

function agregarServicio(id) {
    const servicioElegido = medicos.find((especialista) => especialista.codigo === id)
    servicio.push(servicioElegido)
    localStorage.setItem("misServicios", JSON.stringify(servicio))
}

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
    especialistaServicio.forEach((ser) => {
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
    let especialistaEliminado = especialistaServicio.find((especialista) => especialista.codigo === id)
    if (especialistaEliminado) {
        const posicion = especialistaServicio.indexOf(especialistaEliminado)
        especialistaServicio.splice(posicion, 1)
        armarFilaHTML()
        Swal.fire({
            icon: "error",
            title: "Eliminado"
        })
    }
}

function incluirTotal(){
    let cont = 0
    especialistaServicio.forEach((ser) => {
        cont += ser.precio
    })

divPrecio.innerHTML = `Total: ${cont}`
}

const activarClickEnBotonFinalizar = () => {
    botonFinalizar.addEventListener("click", () => {
        if (especialistaServicio.length > 0) {
            mostrarMensaje("Su turno fue aceptado, Muchas gracias.")
            tableBody.innerHTML = ""
            divPrecio.innerHTML = ""
            localStorage.clear ()
            console.log(localStorage)
        } else {
            mostrarMensaje("No se ha elegido ningun turno. Elige para poder avanzar.")
        }
    })
}

activarClickEnBotonFinalizar()
const mostrarMensaje = (msg) => {
    const mensaje = document.querySelector("p.mensaje")
    mensaje.textContent = msg
}