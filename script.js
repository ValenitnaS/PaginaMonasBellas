const productos = [
  {
    id: 1,
    nombre: 'Polera Oversize',
    precio: 8000,
    imagen: 'productos/PoleraOversize.jpg'
  },
  {
    id: 2,
    nombre: 'Polera Petalos',
    precio: 8000,
    imagen: 'productos/PoleraPetalos.jpg'
  },
  {
    id: 3,
    nombre: 'Polera AnimalPrint',
    precio: 8000,
    imagen: 'productos/PoleraAnimalPrint.jpg'
  },
  {
    id: 4,
    nombre: 'Sweater Lana',
    precio: 15000,
    imagen: 'productos/Sweater1.jpg'
  },
  {
    id: 5,
    nombre: 'Sweater Lana',
    precio: 15000,
    imagen: 'productos/Sweater2.jpg'
  },
  {
    id: 6,
    nombre: 'Poleron Peludito',
    precio: 10000,
    imagen: 'productos/Poleron1.jpg'
  },
  {
    id: 7,
    nombre: 'Polera Brillos',
    precio: 6000,
    imagen: 'productos/Polera1.jpg'
  },
  {
    id: 8,
    nombre: 'Polera Standard',
    precio: 8000,
    imagen: 'productos/Polera2.jpg'
  },
  {
    id: 9,
    nombre: 'Polera OverSize',
    precio: 15000,
    imagen: 'productos/Polera3.jpg'
  },
  {
    id: 10,
    nombre: 'Crema VS Cactus Water',
    precio: 12000,
    imagen: 'productos/Crema1.jpg'
  },
  {
    id: 11,
    nombre: 'Crema VS Liquid Coconut',
    precio: 12000,
    imagen: 'productos/Crema2.jpg'
  },
  {
    id: 12,
    nombre: 'productos/Crema VS Canyon Flora',
    precio: 12000,
    imagen: 'productos/Crema3.jpg'
  },
  {
    id: 13,
    nombre: 'Frangancias VS',
    precio: 12000,
    imagen: 'productos/Fragancia1.jpg'
  },
  {
    id: 14,
    nombre: 'Fragancias VS',
    precio: 12000,
    imagen: 'productos/Fragancia2.jpg'
  },
  {
    id: 15,
    nombre: 'Fragancias VS',
    precio: 12000,
    imagen: 'productos/Fragancia3.jpg'
  }
];

let carrito = [];

function renderProductos() {
  const contenedor = document.getElementById('productos');
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button onclick="eliminarProducto(${item.id})">❌</button>
    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  document.getElementById('total').textContent = `Total: $${total}`;
}

function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

document.getElementById('formCompra').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const terminos = document.getElementById('terminos').checked;
  const erroresDiv = document.getElementById('errores');

  let errores = [];

  if (nombre === '') errores.push('Nombre es obligatorio');
  if (!correo.includes('@')) errores.push('Correo no válido');
  if (direccion.length < 10) errores.push('Dirección muy corta');
  if (!/^\d+$/.test(telefono) || telefono.length < 8) errores.push('Teléfono no válido');
  if (!terminos) errores.push('Debe aceptar los términos');

  erroresDiv.innerHTML = '';
  if (errores.length > 0) {
    errores.forEach(error => {
      const p = document.createElement('p');
      p.textContent = error;
      erroresDiv.appendChild(p);
    });
  } else {
    alert('¡Compra realizada con éxito!');
    document.getElementById('formCompra').reset();
    carrito = [];
    actualizarCarrito();
  }
});

document.getElementById('btnContinuarCompra').addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de continuar con la compra.');
    return;
  }

  const formulario = document.getElementById('formularioCompra');
  formulario.style.display = 'block';
  formulario.scrollIntoView({ behavior: 'smooth' });
});

renderProductos();
