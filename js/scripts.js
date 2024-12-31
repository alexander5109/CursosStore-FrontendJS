
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

        // Cantidad (hardcodeado a 1)
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = 1;
        row.appendChild(cantidadCelda);

        // Subtotal
        const subtotal = item.price; 
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `$${subtotal}`;
        row.appendChild(subtotalCelda);

        // Agregar fila a la tabla
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
	// Retrieve cart data from localStorage
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

	// Get references to relevant elements
	const carritoItemsContainer = document.getElementById("carrito-items");
	const totalDisplay = document.querySelector("aside .text-end strong");

	// Clear the current cart display
	carritoItemsContainer.innerHTML = "";

	let total = 0;

	// Loop through the cart and create mini cards
	cart.forEach((miniProducto) => {
		const miniCard = document.createElement("div");
		miniCard.className = "card";
		miniCard.innerHTML = `
			<div class="card-body d-flex flex-wrap align-items-center gap-2">
				<div class="flex-grow-1">
					<h4 class="mb-1">${miniProducto.title}</h4>
					<h5 class="text-muted mb-1">$${miniProducto.price.toLocaleString()}</h5>
				</div>
				<div class="d-flex align-items-center gap-2">
					<!-- <button class="btn btn-outline-secondary btn-sm" onclick="modificarCantidad('${miniProducto.id}', -1)">-</button> -->
					<!-- <span>${miniProducto.quantity || 1}</span> -->
					<button class="btn btn-outline-secondary btn-sm" onclick="modificarCantidad('${miniProducto.id}', 1)">+</button>
				</div>
				<p class="mb-0 fw-bold">$${(miniProducto.price * (miniProducto.quantity || 1)).toLocaleString()}</p>
			</div>
		`;

		// contenedor de los botoncitos de agregar o eliminar
		const buttonContainer = miniCard.querySelector('.d-flex.align-items-center.gap-2');

		// Boton de restar
		const minusButton = document.createElement('button');
		minusButton.className = 'btn btn-outline-secondary btn-sm';
		minusButton.textContent = '-';
		minusButton.addEventListener('click', () => eliminarDelCarrito(miniProducto));

		// Boton de agregar
		const plusButton = document.createElement('button');
		plusButton.className = 'btn btn-outline-secondary btn-sm';
		plusButton.textContent = '+';
		plusButton.addEventListener('click', () => agregarAlCarrito(miniProducto));

		// Append los botoncitos a la botonera
		buttonContainer.appendChild(minusButton);
		buttonContainer.appendChild(plusButton);
		
		// Appendear la botonera entera
		miniCard.appendChild(buttonContainer);
		
		carritoItemsContainer.appendChild(miniCard);

		// Update the total
		total += miniProducto.price * (miniProducto.quantity || 1);
	});

	// Update the total display
	totalDisplay.textContent = `Total: $${total.toLocaleString()}`;
}


// Función para agregar al carrito usando localStorage
function agregarAlCarrito(product) {
	
	Swal.fire({
		title: 'Compra Procesada',
		text: 'Se ha procesado la compra #1200',
		icon: 'success',
		confirmButtonText: 'Aceptar'
	});
	
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
	actualizarCarritoLateral();
	// jode mucho esto
	// alert(`${product.title} ha sido agregado al carrito!`);
}

function eliminarDelCarrito(product) {
    // Retrieve the cart from localStorage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Find the index of the first occurrence of the product in the cart
    const productIndex = cart.findIndex(item => item.id === product.id); // Assuming 'id' uniquely identifies a product

    if (productIndex !== -1) {
        // Remove one instance of the product from the cart
        cart.splice(productIndex, 1);
        
        // Update the cart in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Update the UI after removing the product
    actualizarCarritoLateral();
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
						agregarAlCarrito(producto); // Pass the product directly
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


