//traigo listado inicial
fetch('/api/productos', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(response => {
    // console.log(response)
    renderProductList(response)
  });


//eliminar producto

function eliminar_producto(id){

  fetch('/api/productos/' + id.value, {
    method: 'DELETE',
  }).then(res => res.json())
    .then(response => {
      alert("Producto eliminado correctamente.")
      window.location.replace('/')
    });

}


async function renderProductList(products) {
  const response = await fetch('/components/product-card.ejs')
  const plantilla = await response.text()

  const html = ejs.render(plantilla, { products: products })
  document.querySelector('#ProductsMainList').innerHTML = html
}