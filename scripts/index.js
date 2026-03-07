// Importar elementos html básicos
const loginBtn = document.getElementById("login-btn");
const errorMsg = document.getElementById("error-msg");

// Función para mostrar el mensaje de error de credenciales
function showError() {
  errorMsg.style.display = "block";
}

// Función para validar las credenciales y redireccionar
function login(username, password) {
  if (username === "ClienteUCV" && password === "Central_123") {
    // Rol: Clienta o Cliente
    window.location.href = "./pages/catalog.html";
  } else if (username === "caja_01" && password === "Cajero#123") {
    // Rol: Cajera o Cajero
    window.location.href = "./pages/pos.html";
  } else if (username === "adminRoot" && password === "cafetinAdmin") {
    // Rol: Gestión
    window.location.href = "./pages/administration.html";
  } else {
    // Mostrar mensaje
    showError();
  }
}

// Agregar un evento al boton para que "escuche" cuando el usuario haga click
// Se ejecuta una funcion 
loginBtn.addEventListener("click", () => {
  // Importar datos suministrados en el formulario (usuario y contraseña)
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Valida las credenciales
  login(username, password);
});
