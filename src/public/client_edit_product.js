//Product Form
const ProductForm = document.getElementById('ProductForm')

ProductForm.addEventListener('submit', e => {
  e.preventDefault()

  const id = document.querySelector('#ProductId')
  const nombre = document.querySelector('#Nombre')
  const descripcion = document.querySelector('#Descripcion')
  const codigo = document.querySelector('#Codigo')
  const url_img = document.querySelector('#Imagen')
  const precio = document.querySelector('#Precio')
  const stock = document.querySelector('#Stock')

  const product = {
    id: id.value,
    nombre: nombre.value,
    descripcion: descripcion.value,
    codigo: codigo.value,
    url_img: url_img.value,
    precio: precio.value,
    stock: stock.value,
  }


  fetch('/api/productos/'+ id.value, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      alert("Producto editado correctamente.")
      window.location.replace('/')
    });
})



