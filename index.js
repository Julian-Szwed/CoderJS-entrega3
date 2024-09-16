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

