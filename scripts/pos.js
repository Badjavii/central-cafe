// Importar elementos del documento HTML
// 1. Boton para emitir el recibo de pago
const btnEmit   = document.getElementById("emit-btn");
// 2. Mensaje de Recibo Emitido
const receiptMsg = document.getElementById("receipt-msg");

// Agregar evento al boton para que escuche el click
// Cuando se hace click, se hace visible el mensaje de recepcion de recibo
btnEmit.addEventListener("click", () => {
  receiptMsg.classList.add("visible");
  btnEmit.disabled = true;
});
