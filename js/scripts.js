// Un sweet alert. Pero no me anda :(
function alertItemAgregado() {
	Swal.fire({
		title: 'Item agregado!',
		text: 'Agregado al chango!',
		icon: 'success',
		confirmButtonText: 'Aceptar'
	});
}


// Función para agregar al carrito usando localStorage
function agregarAlCarrito(product) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
	alert(`${product.title} ha sido agregado al carrito!`);
}



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
}





		
// --------------------------------------------------------------------#
// ----------------------------ok. main--------------------------------#
// --------------------------------------------------------------------#
document.addEventListener("DOMContentLoaded", fetchProductos);


