
document.querySelectorAll('.mostrar-detalles').forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const detalles = event.currentTarget.nextElementSibling;
      detalles.classList.toggle('detalles-hidden');
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío por defecto del formulario
        formulario.submit(); // Envía el formulario automáticamente
    });
});



































/* // Obtener el carrito almacenado en almacenamiento local
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Renderizar el contenido del carrito en la página de ventas
function renderizarCarrito() {
    const carritoContainer = document.querySelector('.carrito-container');
    carritoContainer.innerHTML = '';

    carrito.forEach((producto) => {
        const carritoItem = document.createElement('div');
        carritoItem.classList.add('carrito-item');
        carritoItem.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Detalles: ${producto.detalles}</p>
        `;
        carritoContainer.appendChild(carritoItem);
    });
}

// Llamar a la función de renderizado cuando se carga la página de ventas
renderizarCarrito();

// Otros códigos para el manejo del carrito, como calcular el precio total, realizar la compra, etc.

// Almacenar el carrito en almacenamiento local (puedes hacer esto al modificar el carrito)
localStorage.setItem('carrito', JSON.stringify(carrito)); */