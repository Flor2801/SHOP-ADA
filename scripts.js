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


// Hacer clic en el icono modo grilla
vistaGrilla.onclick = () => {
  grilla.classList.remove("catalogo-lista");
  detalle.classList.remove("detalles-lista");
}

// Hacer clic en el icono modo lista
vistaLista.onclick = () => {
  grilla.classList.add("catalogo-lista");
  detalle.classList.add("detalles-lista");

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
  }

for (punto of filtroRating) {
     punto.checked = false;
     if (punto.checked = false) {
        tarjeta.classList.remove('hidden');
        } 
    }

for (tipo of filtroCategoria) {
     tipo.checked = false;
     if (tipo.checked = false) {
        tarjeta.classList.remove('hidden');
        } 
}

filtroNombre.value = "";

}


/*
for (let tarjeta of tarjetas) {
if ( productosVisibles !== 0)
  tarjeta.classList.remove("selected");
  actualizarVista()
}
*/






/*************************************  ABRIR CARRITO  ***************************************/


const carrito = document.getElementById("abrir-carrito");
const menu = document.getElementById("menu-compra");
const cerrar = document.getElementById("cerrar");
const overlay = document.getElementById("overlay");
const body = document.getElementsByTagName("body");



carrito.onclick = () => {
  overlay.classList.remove('hidden');
  overlay.classList.add('no_scroll');
};

cerrar.onclick = () => {
  overlay.classList.add('hidden');
};



/*********************************  ABRIR FILTROS RESPONSIVE  ***********************************/


const embudo = document.getElementById("ico-filtros-responsive");
const filtroResponsive = document.getElementById("fil-responsive");

console.log(embudo)
console.log(filtroResponsive)

embudo.onclick = () => { 
  filtroResponsive.classList.remove('hidden');
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


/* TEST ALTERNATIVO
comprar.onclick = () => {
for (let item of Items) {
  if (comprar.datanombre.nombre === item.dataset.nombre) {
    item.classList.remove("hidden")
  }
}
}
*/

const carro = document.getElementById("menu-compra")
const aviso = document.getElementById("descripcion-carrito")


const agregaSamsung1 = document.getElementById("compra-samsung-1")
const itemSamsung1 = document.getElementById("ver-samsung-1")
const quitar = document.getElementById("ico-samsung1")

const footerCarrito = document.getElementById("carrito-footer")
const eliminaSamsung1 = document.getElementById("prod-elimina")


const selector1 = document.getElementById("selector value-1")
const precio1 = document.getElementById("precio-1")
const subtotalCarrito = document.getElementById("subCarrito")

const selector2 = document.getElementById("selector value-2")
const subtotalCheckout = document.getElementById("subtotal-checkout")
const totalCheckout = document.getElementById("total-checkout")
const Items = document.getElementsByClassName("item")



const carritoVacio = () => {
  let productosComprados = document.getElementsByClassName("comprado").length
  if (productosComprados == 0) {
    aviso.classList.remove("hidden")
    footerCarrito.classList.add("hidden")
    carro.classList.add("hidden")
  }
  
}

agregaSamsung1.onclick = () => {
  carro.classList.remove("hidden")
  itemSamsung1.classList.remove("hidden")
  itemSamsung1.classList.add("comprado") 
  aviso.classList.add("hidden")
  footerCarrito.classList.remove("hidden")
  carro.appendChild(itemSamsung1)
  actualizarCarrito()

}

eliminaSamsung1.onclick = () => {
  itemSamsung1.classList.add("hidden")
  itemSamsung1.classList.remove("comprado") 
  actualizarCarrito()
  carritoVacio()
}



const itemPlay = document.getElementById("ver-item-play")
const agregaPlay = document.getElementById("compra-play")

agregaPlay.onclick = () => {
  itemPlay.classList.remove("hidden")
  itemPlay.classList.add("comprado") 
  aviso.classList.add("hidden")
  carro.appendChild(itemPlay)
  actualizarCarrito()

}



const itemNokia = document.getElementById("ver-item-nokia")
const agregaNokia = document.getElementById("compra-nokia")

agregaNokia.onclick = () => {
  itemNokia.classList.remove("hidden")
  itemNokia.classList.add("comprado") 
  aviso.classList.add("hidden")
  carro.appendChild(itemNokia)
  actualizarCarrito()
}


const itemSamsung2 = document.getElementById("ver-samsung2")
const agregaSamsung2 = document.getElementById("compra-samsung2")



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



/*
const finalizarproceso = () => {
for (let final of finalizarCheckout) {
  if (final.onclick) {
    overlayVaciar.classList.add("hidden")
  }
}
}
*/

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

  let productosComprados = document.getElementsByClassName("selected")
  for (let producto of productosComprados) {
     producto.classList.remove("comprado")
  }

  actualizarCarrito()

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



 //RESOLVER COMO HACER QUE SE VEA EL VALOR DE LO YA COMPRADO AL ABRIR EL CARRITO
/*
comprar.onclick = () => {
  for (let item of Items) {
    let valor = item.selector.value
    let valorFinal = valor*100
    valorFinal = subtotalCarrito.textContent
  }
}
*/

selector1.onclick = () => {
totalSamsung1 = selector1.value*22500
subtotalCarrito.textContent = totalSamsung1
actualizarSubtotal()
}

selector2.onclick = () => {
totalPlay = selector2.value*50000
actualizarSubtotal()
}


actualizarSubtotal = () => {
  subtotalCarrito.textContent = (totalSamsung1 + totalPlay)
  subtotalCheckout.textContent = subtotalCarrito
}

comprar.onclick = () => {
  checkout.classList.remove("hidden")
  subtotalCheckout.textContent = subtotalCarrito
}


/*
COMO TRANSFORMAR A NUMERO EL DATA PRECIO, NO FUNCIONA NUMBER P PARSE INT
*/


 
/********************************  BOTON ELIMINAR DE LA TARJETA   *********************************/


/********************************  PAGO EN CHEKOUT  *********************************/

/*
const subtotalCheckout = document.getElementById("subototal-checkout")
const totalCheckout = document.getElementById("total-checkout")
subtotalCheckout.textContent = subtotalCarrito
/// Cada vez que se selecciona un input --> Aparece la leyenda y actualiza el Total de Checkout
totalCheckout.textContent = subtotalCarrito + recargo - descuento + envio
*/


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