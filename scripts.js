const filtroCategoria = document.getElementsByClassName("tipo");
const filtroRating = document.getElementsByClassName("review");
const filtroNombre = document.getElementById("search");
const tarjetas = document.getElementsByClassName("tarjeta");
const limpiar = document.getElementById("limpieza");



/*************************************  VISTA LISTA Y GRILLA  ***************************************/

// ICONOS
const vistaGrilla = document.getElementById("vista-grilla")
const vistaLista = document.getElementById("vista-lista")
// LISTAS DE PRODUCTOS
const grilla = document.getElementById("catalogo-grilla")
// TARJETAS DE PRODUCTOS
const descripciones = document.getElementsByClassName("texto-descriptivo")
const detalle = document.getElementById("desc-producto")
const detalles = document.querySelectorAll(".desc-producto")


// Hacer clic en el icono modo grilla
vistaGrilla.onclick = () => {
  grilla.classList.remove("catalogo-lista");
  detalle.classList.remove("detalles-lista");

  for (textos of descripciones) {
    textos.classList.add("hidden")
  }

}

// Hacer clic en el icono modo lista
vistaLista.onclick = () => {
  grilla.classList.add("catalogo-lista");

  for (textos of descripciones) {
    textos.classList.remove("hidden")
  }

  for (card of detalles) {
    card.classList.add("detalles-lista");
  }

}


/*************************************  FUNCIONES DE FILTRO  ***************************************/

/*  FUNCIONES SEGUN TIPO DE BUSQUEDA  */

// Busqueda por input de texto
filtroNombre.oninput = () => {
  filtrarTarjetas ()
  actualizarVista()
}

// Busqueda por checks de categoria
for (let tipo of filtroCategoria) { 
  tipo.oninput = () => {
    filtrarTarjetas ()
    actualizarVista()
  }
}

// Busqueda por checks de calificacion
for (let punto of filtroRating) {
  punto.oninput = () => {
    filtrarTarjetas ()
    actualizarVista()
  }
}

/////////////////////////////////////////


const filtrarTarjetas = () => {
  for (let tarjeta of tarjetas) {
    if (pasaFiltros(tarjeta)) {
      mostrarTarjetas(tarjeta)
    }
    else {
      ocultarTarjetas(tarjeta)
    }
  }
}



const mostrarTarjetas = (tarjeta) => {
  tarjeta.classList.remove("hidden");
  tarjeta.classList.add("selected");

}

const ocultarTarjetas = (tarjeta) => {
  tarjeta.classList.add("hidden")
  tarjeta.classList.remove("selected");
}




const pasaFiltros = (tarjeta) => {

  if (filtroInputEscrito(tarjeta)== true && filtroProductos(tarjeta) == true && filtroEstrellas(tarjeta)== true) {
    return true
}
else {
    return false
}

}


/*  FILTRO INPUT DE TEXTO  */

const filtroInputEscrito = (tarjeta) => {
  if (hayAlgoEscritoEnInput()) {
    return coincideBusquedaInputConTarjeta(tarjeta)
}
else {
    return true
}
}

const hayAlgoEscritoEnInput = () => {
  return Boolean(filtroNombre.value)
}

const coincideBusquedaInputConTarjeta = (tarjeta) => {
  const nombreTarjeta = tarjeta.dataset.nombre
  const busquedaUsuario = filtroNombre.value.toLowerCase()
  
  if (nombreTarjeta.includes(busquedaUsuario)) {
      return true
  }
  else {
      return false
  }
}

/*  FILTRO CHECKS DE CATEGORIA DE PRODUCTOS  */

const filtroProductos = (tarjeta) => {
  
  if (hayAlgunTipoChequeado()) {
    return coincideTipoConTarjeta(tarjeta)
}
else {
    return true
}
}

const hayAlgunTipoChequeado = () => {
  for (let tipo of filtroCategoria) {
      if (tipo.checked) {
          return true
      }
  }
  return false
}

const coincideTipoConTarjeta = (tarjeta) => {
  for (let tipo of filtroCategoria) {
      if (tipo.value === tarjeta.dataset.categoria && tipo.checked) {
          return true
      }
      if (tipo.value === "todos" && tipo.checked) {
          return true
      }
  }
  return false
}


/*  FILTRO CHECKS DE CALIFICACION */


const filtroEstrellas = (tarjeta) => {
  
  if (hayAlgunPuntoSeleccionado()) {
    return coincidePuntoConTarjeta(tarjeta)
}
else {
    return true
}
}

const hayAlgunPuntoSeleccionado = () => {
  for (let punto of filtroRating) {
      if (punto.checked) {
          return true
      }
  }
  return false
}

const coincidePuntoConTarjeta = (tarjeta) => {
  for (let punto of filtroRating) {
      if (punto.value === tarjeta.dataset.rating && punto.checked) {
          return true
      }
     
  }
  return false
}



/*  LIMPIAR TODOS LOS FILTROS */


limpiar.onclick = () => {

  for (cards of tarjetas) {
  cards.classList.remove('hidden')
  cards.classList.add("selected");
  
  }

for (punto of filtroRating) {
     punto.checked = false;
    }

for (tipo of filtroCategoria) {
     tipo.checked = false;
}

filtroNombre.value = "";

actualizarVista()
}



/*************************************  ABRIR CARRITO  ***************************************/


const carrito = document.getElementById("abrir-carrito");
const menuCarrito = document.getElementById("menu-compra");
const cerrar = document.getElementById("cerrar");
const overlay = document.getElementById("overlay");
const body = document.getElementsByTagName("body");


carrito.onclick = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('no-scroll');
};

cerrar.onclick = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('no-scroll');
};



/*********************************  ABRIR FILTROS RESPONSIVE  ***********************************/


const embudo = document.getElementById("ico-filtros-responsive");
const menuResponsive = document.getElementById("menu-filtros");

embudo.onclick = () => { 
  overlay.classList.remove("hidden");
  menuResponsive.classList.add("ver-filtros-responsive");
};


/***************************************  MODAL CHECKOUT  ****************************************/


const botonSeguir = document.getElementsByClassName("seguir")
const botonFinalizar = document.getElementsByClassName("finalizar")
const modalCheckout = document.getElementsByClassName("modal-compra")

console.log(botonSeguir)
console.log(botonFinalizar)
console.log(modalCheckout)

botonSeguir.onclick = () => {
  modalCheckout.classList.add('hidden');
}

botonFinalizar.onclick = () => {
  modalCheckout.classList.add('hidden');
}


/*********************************  AGREGRAR PRODUCTOS AL CARRITO ***********************************/

// PARTES DEL CARRITO
const carro = document.getElementById("menu-compra")
const aviso = document.getElementById("descripcion-carrito")
const footerCarrito = document.getElementById("carrito-footer")
const subtotalCheckout = document.getElementById("subtotal-checkout")
const totalCheckout = document.getElementById("total-checkout")

// PARTES DE LAS TARJETAS
const Items = document.getElementsByClassName("item")
const botones = document.getElementsByClassName("comprar")
const quitar = document.getElementById("ico-samsung1")
const precio1 = document.getElementById("precio-1")
const subtotalCarrito = document.getElementById("subCarrito")

const selector1 = document.getElementById("selector value-1")
const selector2 = document.getElementById("selector value-2")
const selector3 = document.getElementById("selector value-3")
const selector4 = document.getElementById("selector value-4")


const carritoVacio = () => {
  let productosComprados = document.getElementsByClassName("comprado").length
  if (productosComprados == 0) {
    aviso.classList.remove("hidden")
    footerCarrito.classList.add("hidden")
    carro.classList.add("hidden")
    actualizarCarrito()
    actualizarSubtotal()
  }
  else {
    aviso.classList.add("hidden")
    footerCarrito.classList.remove("hidden")
    carro.classList.remove("hidden")
  }
  
}

/*

//////////  POSIBLE FUNCION PARA AGREGAR PRODUCTOS AL CARRITO



for (let boton of botones) {
if (boton.onclick) {
  for (let item of Items) {
  if (boton.dataset.nombre === item.dataset.nombre) {
    item.classList.remove("hidden")
    item.classList.add("comprado") 
    carro.appendChild(itemSamsung1)
    actualizarCarrito()
    actualizarSubtotal()
    carritoVacio()
  }
}
}
}

*/


const agregaSamsung1 = document.getElementById("compra-samsung-1")
const itemSamsung1 = document.getElementById("ver-samsung-1")
const eliminaSamsung1 = document.getElementById("elimina-samsung-1")

agregaSamsung1.onclick = () => {
  itemSamsung1.classList.remove("hidden")
  itemSamsung1.classList.add("comprado") 
  carro.appendChild(itemSamsung1)
  actualizarCarrito()
  actualizarSubtotal()
  carritoVacio()
}

eliminaSamsung1.onclick = () => {
  itemSamsung1.classList.add("hidden")
  itemSamsung1.classList.remove("comprado") 
  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
}



const itemPlay = document.getElementById("ver-item-play")
const agregaPlay = document.getElementById("compra-play")
const eliminaPlay = document.getElementById("elimina-play")


agregaPlay.onclick = () => {
  itemPlay.classList.remove("hidden")
  itemPlay.classList.add("comprado") 
  carro.appendChild(itemPlay)
  actualizarCarrito()
  actualizarSubtotal()
  carritoVacio()
}

eliminaPlay.onclick = () => {
  itemPlay.classList.add("hidden")
  itemPlay.classList.remove("comprado")
  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
}



const itemNokia = document.getElementById("ver-item-nokia")
const agregaNokia = document.getElementById("compra-nokia")
const eliminaNokia = document.getElementById("elimina-nokia")

agregaNokia.onclick = () => {
  itemNokia.classList.remove("hidden")
  itemNokia.classList.add("comprado") 
  carro.appendChild(itemNokia)
  actualizarCarrito()
  actualizarSubtotal()
  carritoVacio()
}

eliminaNokia.onclick = () => {
  itemNokia.classList.add("hidden")
  itemNokia.classList.remove("comprado") 
  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
}




const itemSamsung2 = document.getElementById("ver-item-samsung-2")
const agregaSamsung2 = document.getElementById("compra-samsung-2")
const eliminaSamsung2 = document.getElementById("elimina-samsung-2")

agregaSamsung2.onclick = () => {
  itemSamsung2.classList.remove("hidden")
  itemSamsung2.classList.add("comprado") 
  carro.appendChild(itemSamsung2)
  actualizarCarrito()
  actualizarSubtotal()
  carritoVacio()
}

eliminaSamsung2.onclick = () => {
  itemSamsung2.classList.add("hidden")
  itemSamsung2.classList.remove("comprado") 
  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
}


const itemIphone = document.getElementById("ver-iphone")
const agregaIphone = document.getElementById("compra-iphone")
const eliminaIphone = document.getElementById("elimina-iphone")

agregaIphone.onclick = () => {
  itemIphone.classList.remove("hidden")
  itemIphone.classList.add("comprado") 
  carro.appendChild(itemIphone)
  actualizarCarrito()
  actualizarSubtotal()
  carritoVacio()
}

eliminaIphone.onclick = () => {
  itemNokia.classList.add("hidden")
  itemNokia.classList.remove("comprado") 
  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
}


const itemCanon = document.getElementById("ver-canon")
const agregaCanon = document.getElementById("compra-canon")
const eliminaCanon = document.getElementById("elimina-canon")

agregaCanon.onclick = () => {
  itemCanon.classList.remove("hidden")
  itemCanon.classList.add("comprado") 
  carro.appendChild(itemCanon)
  actualizarCarrito()
  actualizarSubtotal()
  carritoVacio()
}

eliminaCanon.onclick = () => {
  itemNokia.classList.add("hidden")
  itemNokia.classList.remove("comprado") 
  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
}





/***************************  COMPRAR Y ABRIR MODAL CHECKOUT O ABRIR MODAL VACIAR  ***************************/


const comprar = document.getElementById("carrito-comprar")
const checkout = document.getElementById("modal-checkout")
const vaciar = document.getElementById("carrito-vaciar")
const seguirCheckout = document.getElementById("fin-1")
const finalizarCheckout = document.getElementById("fin-2")


comprar.onclick = () => {
  checkout.classList.remove("hidden")
  subtotalCheckout.textContent = subtotalCarrito
}

vaciar.onclick = () => {
  overlayVaciar.classList.remove("hidden")
}

seguirCheckout.onclick = () => {
  checkout.classList.add("hidden")
}



/***************************  MODAL VACIAR CARRTIO  ***************************/


const overlayVaciar = document.getElementById("overlay-vaciar")
const botonCancelarModal = document.getElementById("boton-modal-cancelar")
const botonVaciarModal = document.getElementById("boton-modal-vaciar")


botonCancelarModal.onclick = () => {
  overlayVaciar.classList.add("hidden")
}

botonVaciarModal.onclick = () => {
  overlayVaciar.classList.add("hidden")
  aviso.classList.remove("hidden")
  footerCarrito.classList.add("hidden")
  carro.classList.add("hidden")
 

  let productosComprados = document.getElementsByClassName("comprado")
  for (let producto of productosComprados) {
     producto.classList.remove("comprado")
     producto.classList.add("hidden")
     
  }

  actualizarCarrito()
  carritoVacio()
  actualizarSubtotal()
  
}


/***************************  VER TOTAL PRODUCTOS FILTRADOS  ***************************/


let productosTotales = document.getElementsByClassName("tarjeta").length
let productosVisibles = document.getElementsByClassName("selected").length
let verProductosVisibles = document.getElementById("visibles-filtro")
let verProductosTotales = document.getElementById("total-catalogo")

console.log(verProductosVisibles)
console.log(verProductosTotales)

const actualizarVista = () => {
  let productosTotales = document.getElementsByClassName("tarjeta").length
  let productosVisibles = document.getElementsByClassName("selected").length
  verProductosVisibles.textContent = productosVisibles
  verProductosTotales.textContent = productosTotales
}


/***************************  VER TOTAL PRODUCTOS COMPRADOS  ***************************/


let totalCarrito = document.getElementById("total-carrito")
let productosComprados = document.getElementsByClassName("comprado").length

actualizarCarrito = () => {
  let productosComprados = document.getElementsByClassName("comprado").length
  totalCarrito.textContent = productosComprados

}





/***************************   SELECCIONAR CANTIDAD DE PRODUCTOS y SUBTOTAL CARRITO  ***************************/


/* //// POSIBLE FUNCION PARA SELECCIONAR CANTIDAD DE PRODUCTOS //////////
comprar.onclick = () => {
  for (let item of Items) {
    let valor = item.selector.value
    let valorFinal = valor*100
    valorFinal = subtotalCarrito.textContent
  }
}
*/

selector1.onclick = () => {
totalSamsung1 = selector1.value*22000
actualizarSubtotal()
}

selector2.onclick = () => {
totalPlay = selector2.value*30000
actualizarSubtotal()
}

selector1.onclick = () => {
totalNokia = selector1.value*32500
actualizarSubtotal()
}
  
selector2.onclick = () => {
totalSamsung2 = selector2.value*56000
actualizarSubtotal()
}


actualizarSubtotal = () => {
  subtotalFinal = selector1.value*22000 + selector2.value*30000 + selector3.value*32500 + selector4.value*56000
  subtotalCarrito.textContent = subtotalFinal
}



//// COMPRAMOS Y AVANZAMOS AL CHEKOUT

comprar.onclick = () => {
  checkout.classList.remove("hidden")
  subtotalCheckout.textContent = subtotalFinal
  totalFinalCheckout.textContent = subtotalFinal
}


 
/***************************  BOTON ELIMINAR DE LA TARJETA   ************************/



/********************************  PAGO EN CHEKOUT  *********************************/




let recargoCheckout = document.getElementById("recargo-valor")
let descuentoCheckout = document.getElementById("descuento-valor")
let envioCheckout = document.getElementById("envio-valor")


let checkEfectivo = document.getElementById("check-efectivo")
let checkTarjeta = document.getElementById("check-tarjeta")
let checkEnvio = document.getElementById("check-envio")
let checkDescuento = document.getElementById("check-descuento")


let totalFinalCheckout = document.getElementById("total-checkout")



  
// PAGO EN EFECTIVO SELECCIONADO
checkEfectivo.onclick = () => {
  // BORRAR RENGLON DE RECARGO
  operacionRecargo = 0
  recargoCheckout.textContent = operacionRecargo
  calcularTotalCheckout()
}

// CALCULAR RECARGO POR PAGO CON TARJETA
checkTarjeta.onclick = () => {
  calcularTarjeta()
}

const calcularTarjeta = () => {
  if (checkTarjeta.onclick) {
      let subtotalResumen = subtotalFinal
      operacionRecargo = subtotalResumen*0.10
      recargoCheckout.textContent = operacionRecargo
      calcularTotalCheckout()
    }
    else {
      operacionRecargo = 0
      recargoCheckout.textContent = operacionRecargo
      calcularTotalCheckout()
    }
  }


// CALCULAR DESCUENTO 
checkDescuento.onclick = () => {
  calcularDescuento()
}

checkDescuento.onclick = () => {
  if (checkDescuento.checked) {
    let subtotalResumen = subtotalFinal
    operacionDescuento = subtotalResumen*0.20
    descuentoCheckout.textContent = operacionDescuento
    calcularTotalCheckout()
  }
  else {
    operacionDescuento = 0
    operacionDescuento.textContent = 0
    calcularTotalCheckout()
  }
  return operacionDescuento
}


// CALCULAR RECARGO POR ENVIO

checkEnvio.onclick = () => {
  if (checkEnvio.checked) {
    envioCheckout.textContent = 300
    calcularTotalCheckout()
  }
  else {
    operacionEnvio = 0
    operacionEnvio.textContent = operacionEnvio
    calcularTotalCheckout()
  }
  return operacionEnvio
}



////  CALCULAR TOTAL
const calcularTotalCheckout = () => {
  let checkEnvio = document.getElementById("check-envio")
  if (checkEnvio.checked) {
    let operacionTotal = subtotalResumen + operacionRecargo + operacionDescuento + 300
    totalFinalCheckout.textContent = operacionTotal
  }
  else {
    let operacionTotal = subtotalResumen + operacionRecargo + operacionDescuento
    totalFinalCheckout.textContent = operacionTotal
  }
  }






/********************************  FINALIZAR COMPRA  ********************************/


const inputNombre = document.getElementById("nombre-cliente")
const inputMail = document.getElementById("mail-cliente")


finalizarCheckout.onclick = () => {

  if (inputNombre == false || inputMail == false) {
    checkout.classList.remove("hidden");
    inputNombre.focus();
    inputMail.focus();
  }

}

