//traigo listado inicial
fetch('/api/carrito', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(async response => {
    console.log(response)
    await renderCarrito(response)
    listenAddProductForm()
  });

//CREAR CARRITOS
const CrearCarritoButton = document.getElementById('CrearCarrito')
CrearCarritoButton.addEventListener('click', () => {
  fetch('/api/carrito', {
    method: 'POST',
    body: null,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      window.location.replace('/mi_carrito')
    })
    .catch(error => {
      console.error(error);
    })
})


//AGREGAR PRODUCTOS AL CARRITO - POR ID DE PRODUCTO (EL QUE FIGURA EN LAS CARDS)
function listenAddProductForm() {

  const AddProductForm = document.getElementById('AddProductForm')
  AddProductForm.addEventListener('submit', e => {
    e.preventDefault()


    const cart_id = document.getElementById('CartId')
    const producto_id = document.getElementById('ProductId')


    fetch('/api/carrito/'+ cart_id.value +'/productos/'+ producto_id.value , {
      method: 'POST',
      body: null,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(async response => {
      await renderCarrito(response)
      listenAddProductForm()
    })
    .catch(error => {
      console.error(error);
    })


  })



}

async function renderCarrito(carts) {
  const response = await fetch('/components/carrito-index.ejs')
  const plantilla = await response.text()

  const html = ejs.render(plantilla, { carts: carts })
  document.querySelector('#MiCarrito').innerHTML = html
}

function eliminar_carrito(id) {

  fetch('/api/carrito/' + id.value, {
    method: 'DELETE',
  }).then(res => res.json())
    .then(response => {
      console.log(response)
      alert("El carrito fue eliminado correctamente.")
      window.location.replace('/mi_carrito')
    });

}

function eliminar_producto_carrito(event) {

  const cart_id = event.getAttribute('data-cartId')
  const product_id = event.getAttribute('data-productId')

  fetch('/api/carrito/' + cart_id + '/productos/' + product_id, {
    method: 'DELETE',
  }).then(res => res.json())
    .then(response => {
      console.log(response)
      alert("El producto fue eliminado del carrito.")
      window.location.replace('/mi_carrito')
    });

}
