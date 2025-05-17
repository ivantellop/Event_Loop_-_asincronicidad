const btnAgregar = document.getElementById('btnAgregar');
const pedidosContainer = document.getElementById('pedidosContainer');

let contadorPedidos = parseInt(localStorage.getItem('contadorPedidos')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    mostrarHistorial();
});

btnAgregar.addEventListener('click', () => {
    contadorPedidos++;
    localStorage.setItem('contadorPedidos', contadorPedidos);
    agregarPedido(contadorPedidos);
});

function agregarPedido(id) {
    const div = document.createElement('div');
    div.classList.add('pedido', 'en-proceso');
    div.innerText = `Pedido #${id} - En proceso...`;

    pedidosContainer.appendChild(div);

    prepararPedido().then(() => {
        div.classList.remove('en-proceso');
        div.classList.add('completado');
        const fecha = new Date().toLocaleString();
        div.innerText = `Pedido #${id} - Completado ✅ (${fecha})`;

        guardarEnHistorial(id, fecha);
    });
}

function prepararPedido() {
    return new Promise((resolve) => {
        const tiempo = Math.floor(Math.random() * 3000) + 2000;
        setTimeout(resolve, tiempo);
    });
}

function guardarEnHistorial(id, fecha) {
    const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];
    historial.push({ id, estado: 'completado', fecha });
    localStorage.setItem('historialPedidos', JSON.stringify(historial));
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialPedidos')) || [];

    historial.forEach(pedido => {
        const div = document.createElement('div');
        div.classList.add('pedido', 'completado');
        div.innerText = `Pedido #${pedido.id} - Completado ✅ (${pedido.fecha})`;
        pedidosContainer.appendChild(div);
    });
}
