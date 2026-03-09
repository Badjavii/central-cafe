// Importar elementos del codigo HTML 
// 1. Lista de links de navegacion
const navLinks = document.querySelectorAll(".nav-link");
// 2. Lista de paginas de navegacion
const paginas  = document.querySelectorAll(".page");

// Inicializar y declarar variables y listas
// 1. Lista de productos en el sistema
const productos = [
  { id: 1, nombre: "Café Negro", precio: 2.50, img: "../imgs/cafe-negro.webp" },
  { id: 2, nombre: "Malta", precio: 1.10, img: "../imgs/malta.webp" },
  { id: 3, nombre: "Empanada de Queso", precio: 1.80, img: "../imgs/empanada-queso.webp" },
  { id: 4, nombre: "Empanada de Carne Molida", precio: 2.50, img: "../imgs/empanada-carne.webp" },
  { id: 5, nombre: "Brownie", precio: 2.90, img: "../imgs/brownie.webp" },
];

// Funcion para inyectar codigo HTML que mostrara la lista de elementos
// disponibles para eliminar
function renderizarListaEliminar() {
  const lista = document.getElementById("delete-products-list");

  if (productos.length === 0) {
    lista.innerHTML = "<li class='empty-msg'>No hay productos en el menú.</li>";
    return;
  }

  lista.innerHTML = productos.map(producto => `
    <li class="delete-item" id="delete-item-${producto.id}">
      <div class="delete-item-info">
        <span class="delete-item-name">${producto.nombre}</span>
        <span class="delete-item-price">$${producto.precio.toFixed(2)}</span>
      </div>
      <button class="danger-btn" onclick="eliminarProducto(${producto.id})">Eliminar</button>
    </li>
  `).join("");
}

// Funcion para eliminar un producto especifico y volver a renderizar la lista
function eliminarProducto(id) {
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) { 
    productos.splice(indice, 1);
  }
  renderizarListaEliminar();
}

// Funcion que inyecta codigo para mostrar el producto agregado
function mostrarProductoAgregado(producto) {
  const wrapper = document.getElementById("added-products-wrapper");
  const lista   = document.getElementById("added-products-list");

  wrapper.style.display = "block";
  const li = document.createElement("li");
  li.className = "added-item";
  li.innerHTML = `
    <span class="added-item-name">${producto.nombre}</span>
    <span class="added-item-price">$${producto.precio.toFixed(2)}</span>
    <span class="added-item-img">${producto.img}</span>
  `;
  lista.appendChild(li);
}

// Funcion para mostrar el mensaje de exito al agregar el producto
function mostrarMensajeExito() {
  const msg = document.getElementById("add-success-msg");
  msg.classList.add("visible");
  setTimeout(() => msg.classList.remove("visible"), 2500);
}

// Funcion para limpiar el formulario para agregar un nuevo producto
function limpiarFormulario() {
  document.getElementById("product-name").value  = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-img").value   = "";
}

// Agregar un evento a cada uno de los enlaces de navegacion para escuchar clicks
// Al hacer click, se navegara a la pagina deseada
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const paginaActual = link.dataset.section;

    paginas.forEach(p => p.classList.remove("active"));
    navLinks.forEach(l => l.classList.remove("active"));

    document.getElementById(paginaActual).classList.add("active");
    link.classList.add("active");
  });
});

// Agregar un evento para el boton de agregar producto 
// Al hacer click en el boton, se agregara el producto con los datos
document.getElementById("add-btn").addEventListener("click", () => {
  const nombre  = document.getElementById("product-name").value.trim();
  const precio = parseFloat(document.getElementById("product-price").value);
  const img   = document.getElementById("product-img").value.trim();

  if (!nombre || !precio || !img) return;

  const nuevoProducto = { id: Date.now(), nombre, precio, img, };

  productos.push(nuevoProducto);
  mostrarProductoAgregado(nuevoProducto);
  mostrarMensajeExito();
  limpiarFormulario();
  renderizarListaEliminar();
});

renderizarListaEliminar();
