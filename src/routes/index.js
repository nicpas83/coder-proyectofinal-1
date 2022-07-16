const express = require('express')
const app = express()
const { Router } = require('express')
const router = Router()
const path = require('path')

const Producto = require('../models/Producto')
const objProduct = new Producto();

router.get('/', async (req, res) => {
    res.render('main', {})
})  

router.get('/agregar_producto', (req, res) => {
    res.render('agregar_productos', {})
})

router.get('/editar_producto/:id', async (req, res) => {
    const product = await objProduct.getById(req.params.id)
    res.render('editar_producto', {product: product})
})

router.get('/mi_carrito', (req, res) => {
    res.render('mi_carrito', {})
})



module.exports = router