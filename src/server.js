const express = require('express')


const app = express()
const puerto = 8080

const { Router } = require('express')
const router = Router()

//configuracion
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//motor de plantillas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views/layouts'))

//espacio público del servidor
app.use('/', express.static(path.join(__dirname + '/public')))
app.use('/components', express.static(__dirname + '/views/components'))


//rutas
const rutas = require('./routes/index')
app.use('/', rutas);

const productos = require('./routes/productos-routing')
const carrito = require('./routes/carrito-routing')
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)



app.listen(puerto, (error) => {
    if(error){
        console.log(`Ha ocurrido un error al iniciar`)
    }else{
        console.log(`Servidor conectado en el puerto: ${puerto}`)
    }
})