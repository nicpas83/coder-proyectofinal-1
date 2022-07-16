fs = require('fs')
const path = require('path')

class Producto {

    id;
    timestamp;
    nombre;
    descripcion;
    codigo;
    url_img;
    precio;
    stock;

    constructor() {
        this.fileName = path.resolve(__dirname, '../storage/db_productos.txt');
    }


    async add(producto) {
        let contentFile = await this.getAll();
        //defino id
        producto.id = 1;
        producto.timestamp = Date.now();
        if (contentFile.length > 0) {
            let lastId = this.getLastId(contentFile);
            producto.id = lastId + 1;
        }
        //agrego data
        contentFile.push(producto);

        const newContentFile = JSON.stringify(contentFile);
        try {
            await fs.promises.writeFile(this.fileName, newContentFile)
            return producto;
        }
        catch (error) {
            return error;
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

    async delete(id) {
        if (this.getById(id)) {
            let data = await this.getAll();
            let newData = JSON.stringify(data.filter(val => Number(val.id) != Number(id)));

            try {
                //sobreescribo el file
                await fs.writeFileSync(this.fileName, newData)
                return true
            } catch (error) {
                return error
            }

        } else {
            console.log('El producto que intenta eliminar no existe')
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

module.exports = Producto