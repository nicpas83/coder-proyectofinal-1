const { Router } = require('express')
const router = Router()
const Producto = require('../models/Producto')
const objProduct = new Producto();

router.get('/:id?', async (req, res) => {
     if(req.params.id){
        const data = await objProduct.getById(req.params.id)
        res.json(data)
    }else{
        const data = await objProduct.getAll()
        res.json(data)
    }
})

router.post('/', async (req, res) => {
    const { nombre, descripcion, codigo, url_img, precio, stock } = req.body
    const new_product = { nombre, descripcion, codigo, url_img, precio, stock }
    const data = await objProduct.add(new_product)
    // console.log(data)
    res.json(data)
})

router.put('/:id', async (req, res) => {
    const { nombre, descripcion, codigo, url_img, precio, stock } = req.body
    const product = { nombre, descripcion, codigo, url_img, precio, stock }
    product.id = req.body.id
    const data = await objProduct.update(product.id, product)
    res.json(data)

})

router.delete('/:id', async (req, res) => {
    const response = await objProduct.delete(req.params.id)
    if(response === true ){
        res.status(200).json('Success')
    }else{
        res.status(400).json('Error')
    }
})

module.exports = router