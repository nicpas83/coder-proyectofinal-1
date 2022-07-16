//Product Form
const ProductForm = document.getElementById('ProductForm')

ProductForm.addEventListener('submit', e => {
  e.preventDefault()

  const nombre = document.querySelector('#Nombre')
  const descripcion = document.querySelector('#Descripcion')
  const codigo = document.querySelector('#Codigo')
  const url_img = document.querySelector('#Imagen')
  const precio = document.querySelector('#Precio')
  const stock = document.querySelector('#Stock')

  const new_product = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    codigo: codigo.value,
    url_img: url_img.value,
    precio: precio.value,
    stock: stock.value,
  }

  fetch('/api/productos', {
    method: 'POST',
    body: JSON.stringify(new_product),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response)
      ProductForm.reset()
      alert("Producto agregado correctamente.")
    });
})



