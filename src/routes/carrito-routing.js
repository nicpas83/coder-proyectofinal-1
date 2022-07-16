const { Router } = require('express')
const router = Router()
const Carrito = require('../models/Carrito')
const objCarrito = new Carrito()


router.get('/', async (req, res) => {
    const data = await objCarrito.getAll()
    // console.log(data)
    res.json(data)
})


router.post('/', async (req, res) => {
    const new_cart_id = await objCarrito.create()
    res.json(new_cart_id)
})


router.delete('/:id', async (req, res) => {
    const data = await objCarrito.delete(req.params.id)
    res.json(data)
})

router.get('/:id/productos', async (req, res) => {
    const data = await objCarrito.getProductsCart(req.params.id)
})

router.post('/:id/productos/:producto_id', async (req, res) => {
    const data = await objCarrito.addProduct(req.params.id, req.params.producto_id)
    res.json(data)
})

router.delete('/:id/productos/:producto_id', async (req, res) => {
    const data = await objCarrito.deleteProduct(req.params.id, req.params.producto_id)
    res.json(data)
})

module.exports = router