
// --------------------------------------------------------------------#
// ----------------------------ok. funciones--------------------------------#
// --------------------------------------------------------------------#


// Un sweet alert. Pero no me anda :(
function alertItemAgregado() {
	Swal.fire({
		title: 'Item agregado!',
		text: 'Agregado al chango!',
		icon: 'success',
		confirmButtonText: 'Aceptar'
	});
}

function irAProductos(){
	window.location.href = 'cursos.html';
}
function irACarrito(){
	window.location.href = 'carrito.html';
}

// -----------------------------CositoLateral---------------------------------------#
function vaciarCarritoPage() {
    localStorage.removeItem("cart");
    actualizarCajaDeCompras();
}


function actualizarCajaDeCompras(){
    const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTableBody = document.getElementById('carrito-items');
    const totalgeneral = document.getElementById('total');
    let total = 0;
	carritoTableBody.innerHTML = "";
	
 
    // Cargar productos en la tabla del carrito
    carritoItemsStorage.forEach(item => 
    {
        const row = document.createElement('tr');

        // Imagen del producto
        const imageCelda = document.createElement('td');
		const img = document.createElement('img');
		img.src = item.thumbnail; 
		img.alt = item.title; 
		img.style.width = '100px';
		img.style.height = '100px'
		img.style.objectFit = 'cover';
		imageCelda.style.textAlign = 'center'; 
		imageCelda.style.verticalAlign = 'middle'; 
		imageCelda.appendChild(img);
        row.appendChild(imageCelda);
		
        // Nombre del producto
        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = item.title;
        row.appendChild(nombreCelda);

        // Precio del producto
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `$${item.price}`;
        row.appendChild(precioCelda);

        // Acciones
        const cantidadCelda = document.createElement('td');
        // cantidadCelda.textContent = 1;
		
		const botonera = document.createElement('div');
		botonera.className = 'card-body flex-wrap align-items-center gap-2';
		// botonera.style.flexGrow = '1'; // Ensures the botonera expands within the row
		// botonera.style.display = 'flex'; // Ensure proper layout of buttons inside
		// botonera.style.justifyContent = 'space-between'; // Distributes buttons evenly

			// columna Acciones: Boton de restar
			const minusButton = document.createElement('button');
			minusButton.className = 'btn btn-outline-secondary btn-sm';
			minusButton.textContent = '-';
			minusButton.addEventListener('click', () => eliminarDelCarritoDesdeCaja(item));

			// columna Acciones: Boton de agregar
			const plusButton = document.createElement('button');
			plusButton.className = 'btn btn-outline-secondary btn-sm';
			plusButton.textContent = '+';
			plusButton.addEventListener('click', () => agregarAlCarritoDesdeCaja(item));

		// Append buttons to botonera
		botonera.appendChild(minusButton);
		botonera.appendChild(plusButton);
		cantidadCelda.appendChild(botonera);
        row.appendChild(cantidadCelda);
		

        // Subtotal
        const subtotal = item.price; 
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `$${subtotal}`;
        row.appendChild(subtotalCelda);
		
		
		
		
		// agregar la fila entera
        carritoTableBody.appendChild(row);

        // Sumar al total
        total += subtotal;
    });

    // Mostrar el total
    totalgeneral.textContent = total.toFixed(2);
}



// -----------------------------CositoLateral---------------------------------------#
function vaciarCarritoLateral() {
    localStorage.removeItem("cart");
	actualizarCarritoLateral();
}
function actualizarCarritoLateral(){
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	const carritoItemsContainer = document.getElementById("carrito-items");
	const totalDisplay = document.querySelector("aside .text-end strong");

	// limpieza
	carritoItemsContainer.innerHTML = "";

	let total = 0;

	// recuperar los objetos (miniCard)
	cart.forEach((miniProducto) => {
		const miniCard = document.createElement("div");
		miniCard.className = "card";
		miniCard.innerHTML = `
			<div class="card-body flex-wrap align-items-center gap-2">
				<div class="flex-grow-1">
					<h4 class="mb-1">${miniProducto.title}</h4>
					<h5 class="text-muted mb-1">$${miniProducto.price.toLocaleString()}</h5>
				</div>
				<div class="align-items-center gap-2"></div>
			</div>
		`;

		// contenedor de los botoncitos de agregar o eliminar
		const botonera = miniCard.querySelector('.align-items-center.gap-2');

		// Boton de restar
		const minusButton = document.createElement('button');
		minusButton.className = 'btn btn-outline-secondary btn-sm';
		minusButton.textContent = '-';
		minusButton.addEventListener('click', () => eliminarDelCarritoDesdeProductos(miniProducto));

		// Boton de agregar
		const plusButton = document.createElement('button');
		plusButton.className = 'btn btn-outline-secondary btn-sm';
		plusButton.textContent = '+';
		plusButton.addEventListener('click', () => agregarAlCarritoDesdeProductos(miniProducto));

		// Append los botoncitos a la botonera
		botonera.appendChild(minusButton);
		botonera.appendChild(plusButton);
		
		// Appendear la botonera entera
		miniCard.appendChild(botonera);
		
		carritoItemsContainer.appendChild(miniCard);

		// Update the total
		total += miniProducto.price * (miniProducto.quantity || 1);
	});

	// Update the total display
	totalDisplay.textContent = `Total: $${total.toLocaleString()}`;
}


// Función para agregar al carrito usando localStorage
function agregarAlCarritoDesdeProductos(product) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
	actualizarCarritoLateral();
	// jode mucho esto
	// alert(`${product.title} ha sido agregado al carrito!`);
}

function agregarAlCarritoDesdeCaja(product) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
    actualizarCajaDeCompras();	
	// jode mucho esto
	// alert(`${product.title} ha sido agregado al carrito!`);
}


function eliminarDelCarritoDesdeProductos(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === product.id); // Assuming 'id' uniquely identifies a product
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    actualizarCarritoLateral();
}
function eliminarDelCarritoDesdeCaja(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex(item => item.id === product.id);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    actualizarCajaDeCompras();	
}


/*
// Para modificar la cantidad. Falta logica.
function modificarCantidad(productId, change) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const productIndex = cart.findIndex((product) => product.id === productId);

	if (productIndex !== -1) {
		cart[productIndex].quantity = (cart[productIndex].quantity || 1) + change;
		if (cart[productIndex].quantity <= 0) {
			cart.splice(productIndex, 1);
		}
	}
	localStorage.setItem("cart", JSON.stringify(cart));
	actualizarCarritoLateral();
}
*/


// Cargr los productos cada vez q se abre la pag
function fetchProductos() {
	let contenedor_de_cards = document.getElementById("contenedor_de_cards");
	let limite = 8;
	// const productos_que_me_interesan = ["laptops", "mobile-accessories", "smartphones", "tablets"];
	// const baseURL = `https://dummyjson.com/products/category/laptops?limit=8';
	fetch(`https://dummyjson.com/products/category/laptops?limit=${limite}`)
		.then((response) => response.json())
		.then((data) => {
			const productos = data.products;

			contenedor_de_cards.innerHTML = ""; // Limpiea

			for (let i = 0; i < productos.length; i++) {
				let producto = productos[i];
				// if (!productos_que_me_interesan.includes(producto.category)) {
					// continue;
				// } 
				// if (i >= limite) {
					// break; // Basta
				// }
				
				// Crear las cards
				const cardCol = document.createElement("div");
				cardCol.className = "col";
				// <button onclick="showItemAddedAlert() id="agregarItem" class="btn btn-primary">Agregar</button>
				cardCol.innerHTML = `
					<div class="card">
						<img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
						<div class="card-body">
							<h5 class="card-title">${producto.title}</h5>
							<p class="card-text">${producto.description}</p>
							<button id="agregarItem" class="btn btn-primary">Agregar</button>
						</div>
					</div>
				`;
				
				const botonAgregar = cardCol.querySelector("button");
				botonAgregar.addEventListener("click", () => {
						agregarAlCarritoDesdeProductos(producto); // Pass the product directly
					});
				// limite++; // Increment the product count
				contenedor_de_cards.appendChild(cardCol);
			}
		})
	.catch((error) => console.error("Error fetching products:", error));
	actualizarCarritoLateral();
	
}

function finalizarCompra() {
	// Limpiar el carrito después de finalizar la compra
	localStorage.removeItem('cart'); 
	
    // Firear el sweet Alert
	Swal.fire({
		title: 'Compra Procesada',
		text: 'Se ha procesado la compra #1200',
		icon: 'success',
		confirmButtonText: 'Aceptar'
	});
	
	// Redirigir al inicio despues de 4 segundos
	setTimeout(() => {
	window.location.href = 'cursos.html'; 
	}, 2000);     
}







function decidirQueEjecutar() {
    const currentPage = window.location.pathname;
    if (currentPage.includes("cursos.html")) {
        fetchProductos();
        actualizarCarritoLateral();

    } else if (currentPage.includes("carrito.html")) {
        actualizarCajaDeCompras();
     
	
    }
	
	
}


// --------------------------------------------------------------------#
// ----------------------------ok. main--------------------------------#
// --------------------------------------------------------------------#

document.addEventListener("DOMContentLoaded", decidirQueEjecutar);


