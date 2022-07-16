fs = require('fs')
const path = require('path')
const Producto = require('./Producto')

class Carrito{

    id;
    timestamp;
    productos = [];
    
    constructor() {
        this.fileName = path.resolve(__dirname, '../storage/db_carritos.txt');
    }

    async create(){
        let contentFile = await this.getAll();
        let id = 1;
        if(contentFile.length > 0){
            id = this.getLastId(contentFile) + 1;
        }
        const newCarrito = {
            id: id,
            timestamp: Date.now(),
            productos: []
        }

        contentFile.push(newCarrito);
        const newContentFile = JSON.stringify(contentFile);
        try {
            await fs.promises.writeFile(this.fileName, newContentFile)
            return id;
        }
        catch (error) {
            return error;
        }
    }

    async delete(id) {
        if (this.getById(id)) {
            let data = await this.getAll();
            let newData = JSON.stringify(data.filter(val => Number(val.id) != Number(id)));
            const response = {}
            try {
                //sobreescribo el file
                await fs.writeFileSync(this.fileName, newData)
                response.status = 'success'
                response.message = 'Carrito eliminado correctamente'
                response.code = 200
                return response
            } catch (error) {
                response.status = 'error'
                response.message = error
                response.code = 400
                return response
            }

        } else {
            console.log('El carrito que intenta eliminar no existe')
        }
    }

    
    async deleteProduct(cart_id, product_id){

        let data = await this.getById(cart_id)
        let newData = JSON.stringify(data.productos.filter( val => Number(val.id) != Number(product_id) ));

        data.productos = newData
        try {
            await this.update(cart_id, data)
            return true
        }
        catch(error){
            return error
        }

    }


    async getProductsCart(cart_id){
        const carrito = this.getById(id)
        if(carrito){
            return carrito.productos 
        } else {
            console.log('El carrito no existe')
            return false
        }
    }

    async addProduct(cart_id, product_id){

        const objProducto = new Producto()

        //traigo info del producto seleccionado.
        const product = await objProducto.getById(product_id)
console.log(product)
        if(!product){
            return false
        }

        //traigo el carrito seleccionado y agrego el producto.
        const carritoData = await this.getById(cart_id)
        carritoData.productos.push(product)

        try {
            await this.update(cart_id, carritoData)
            return this.getAll()
            
        } catch (error) {
            return error            
        }

    }

    async update(id, data) {
        let contentFile = await this.getAll()
        const newFile = []
        
        contentFile.forEach( (val) => {
            
            if(Number(val.id) != Number(id)){
                newFile.push(val)
            }
        })
        newFile.push(data)

        const newContentFile = JSON.stringify(newFile);
        try {
            await fs.promises.writeFile(this.fileName, newContentFile)
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async getAll() {
        let data = [];
        try {
            let contentFile = await fs.promises.readFile(this.fileName, 'utf-8');
            if (contentFile.length > 0) {
                data = JSON.parse(contentFile);
            }
            return data;
        }
        catch (error) {
            console.log('Error de lectura: ', error)
        }
    }

    async getById(id) {
        let data = null;
        let contentFile = await this.getAll();

        if (contentFile.length > 0) {
            contentFile.forEach(function (val) {
                if (val.id == id) {
                    data = val;
                }
            })
        }
        return data;
    }

    getLastId(contentFile) {
        let ids = contentFile.map(object => {
            return object.id
        })

        return Math.max(...ids)
    }

}

module.exports = Carrito