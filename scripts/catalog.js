// Importar elementos del documento HTML
// 1. Importar lista de enlaces de la barra de navegacion
const navLinks = document.querySelectorAll(".nav-link");
// 2. Importar lista de paginas de navegacion
const paginas = document.querySelectorAll(".page");
// 3. Importar lista de botones para "añadir" productos
const añadirBtns = document.querySelectorAll(".add-btn");

// Declarar e inicializar variables y/o listas
// 1. Lista de productos seleccionados (carrito de compras)
const carrito = []; // Inica vacia
// 2. Lista de productos existentes en el sistema
const PRODUCTOS = [
  { id: 1, nombre: "Café Negro", precio: 2.50},
  { id: 2, nombre: "Malta", precio: 1.10},
  { id: 3, nombre: "Empanada de Queso", precio: 1.80},
  { id: 4, nombre: "Empanada de Carne Molida", precio: 2.50},
  { id: 5, nombre: "Brownie", precio: 2.50},
];

// Funcion para actualizar el contador de productos dentro del carrito
function actualizarContadorProductos() {
  const cantidad = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
  document.getElementById("cart-count").textContent = cantidad;
}

// Funcion para mostrar un aviso de "producto agregado"
// El aviso se muestra por 2.5 segundos y desaparece
function mostrarAvisoAgregarProducto() {
  const aviso = document.getElementById("shopping-cart-notice");
  aviso.style.display = "block";
  setTimeout(() => { aviso.style.display = "none" }, 2500);
}

// Funcion para mostrar los productos seleccionados en el carrito
// Esta funcion "inyecta" codigo HTML al documento HTML para mostrar la informacion
function renderizarCarrito() {
  const productosCarrito = document.getElementById("cart-items");
  const precioSubtotal = document.getElementById("cart-subtotal");

  // Si no hay productos en el carrito, "inyecta" este codigo HTML
  if (carrito.length === 0) {
    productosCarrito.innerHTML = "<li class='cart-empty-msg'>No hay productos en el carrito.</li>";
    precioSubtotal.textContent = "$0.00";
    return;
  }

  // Si hay productos en el carrito, "inyecta" este otro codigo HTML
  productosCarrito.innerHTML = carrito.map(producto => `
    <li class="cart-item">
      <span class="cart-item-name">${producto.nombre}</span>
      <span class="cart-item-qty">x${producto.cantidad}</span>
      <span class="cart-item-subtotal">$${(producto.precio * producto.cantidad).toFixed(2)}</span>
      <button class="remove-btn" onclick="eliminarDelCarrito(${producto.id})">x</button>
    </li>
  `).join("");

  const subtotal = carrito.reduce((suma, producto) => suma + (producto.precio * producto.cantidad), 0);
  precioSubtotal.textContent = "$" + subtotal.toFixed(2);
}

// Funcion para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  const indice = carrito.findIndex(producto => producto.id === id);
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }
  actualizarContadorProductos();
  renderizarCarrito();
}

// Funcion para confirmar la compra y vaciar el carrito
function confirmarPedido() {
  if (carrito.length === 0) {
    return;
  }

  alert("Pedido Confirmado! Gracias por tu compra!!");
  carrito.splice(0, carrito.length);
  actualizarContadorProductos();
  renderizarCarrito();
}

document.getElementById("confirm-btn").addEventListener("click", confirmarPedido);

// Agregar en cada enlace un evento que "escucha" cuando se hace click en el enlace
// Estos eventos son para navegar entre las distintas paginas (carrito, catalogo, etc)
navLinks.forEach(link => {
  // Se asocia el evento 'click' con una funcion
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const paginaActual = link.dataset.section;

    paginas.forEach(pagina => { pagina.classList.remove("active") });
    navLinks.forEach(Link => { Link.classList.remove("active") });

    document.getElementById(paginaActual).classList.add("active");
    link.classList.add("active");

    if (paginaActual === "shopping-cart-page") {
      renderizarCarrito();
    }
  });
});

// Agregar en cada boton un evento que "escucha" cuando se hace click en el boton
// Estos eventos son para agregar el producto en el carrito
// Por consecuencia, se actualiza el contador del carrito y se muestra el aviso
añadirBtns.forEach((boton, indice) => {
  boton.addEventListener("click", () => {
    const producto = PRODUCTOS[indice];
    const existeProducto = carrito.find(elemento => elemento.id === producto.id);

    if (existeProducto) {
      existeProducto.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1});
    }

    actualizarContadorProductos();
    mostrarAvisoAgregarProducto();
  });
});
