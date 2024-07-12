const url = "http://localhost:3000/productos";
const lista = document.querySelector("[data-products]");
const formulario = document.querySelector("[data-formulario]");

async function obtenerProductos(url) {
  try {
    const response = await fetch(url);
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error("Error: ", error);
  }
}
async function mostrarProductos(url) {
  const productos = await obtenerProductos(url);
  productos.forEach((producto) => {
    const card = crearCard(producto);
    lista.appendChild(card);
  });
}
async function enviarProducto(url, producto) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

function crearCard(producto) {
  const card = document.createElement("li");
  card.innerHTML = `
  <div class="card rounded-md bg-orange-200 grid place-items-center overflow-hidden gap-3 border-2 border-blue-200">
    <img src="${producto.imagen}" alt="${producto.nombre}" class='w-full h-auto object-cover' />
    <h2 class='font-bold text-lg'>${producto.nombre}</h2>
    <p>$ ${producto.precio}</p>
    <button class="mb-2 px-3 py-1 bg-blue-800 hover:bg-blue-500 text-white transition-all rounded-md cursor-pointer">Añadir al carrito</button>
  </div>
  `;
  return card;
}

formulario.addEventListener("submit", enviarFormulario);
function enviarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;
  const producto = {
    nombre,
    precio,
    imagen,
  };
  enviarProducto(url, producto);
  const card = crearCard(producto);
  lista.appendChild(card);
  formulario.reset();
}

mostrarProductos(url);

// function enviarFormulario() {
//   // Obtener los valores de los campos de entrada
//   const nombre = document.getElementById("nombre").value;
//   const email = document.getElementById("email").value;
//   const mensaje = document.getElementById("mensaje").value;

//   // Crear un objeto con los datos del formulario
//   const datosFormulario = {
//     nombre: nombre,
//     email: email,
//     mensaje: mensaje,
//   };

//   // Enviar los datos al servidor utilizando una petición AJAX
//   fetch("/ruta-del-servidor", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datosFormulario),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Manejar la respuesta del servidor
//       console.log(data);
//     })
//     .catch((error) => {
//       // Manejar errores de la petición
//       console.error(error);
//     });
// }
