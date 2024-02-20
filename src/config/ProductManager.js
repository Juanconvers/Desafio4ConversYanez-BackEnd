
import {promises as fs} from 'fs'
import crypto from 'crypto'

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(newProduct){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if(newProduct.code && newProduct.title && newProduct.description && newProduct.price && newProduct.stock){
            const indice = products.findIndex(product => product.code === newProduct.code)
            if (indice === -1) {
                newProduct.id = crypto.randomBytes(10).toString('hex')
                newProduct.status = true
                if (!newProduct.thumbnail)
                    newProduct.thumbnail = []
                prods.push(newProduct)
                await fs.writeFile(this.path, JSON.stringify(products))
                return'Producto creado exitosamente'
            } else {
                return'Producto ya existe en el archivo'
            }
        }else{
            return'Ingrese todos los campos'
        }       
    }

    async getProducts(){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return products
    }

    async getProductsById(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(product => product.id === id)   
            return product 
    }

    async updateProduct(id, nuevoProducto){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(product => product.id === id)
        if(indice != -1){
            products[indice].title = nuevoProducto.title
            products[indice].description = nuevoProducto.description
            products[indice].price = nuevoProducto.price
            products[indice].thumbnail = nuevoProducto.thumbnail
            products[indice].code = nuevoProducto.code
            products[indice].stock = nuevoProducto.stock
            await fs.writeFile(this.path, JSON.stringify(products))
                return'Producto actualizaco exitosamente'
        }else{
            return'El producto no existe'
        }
    }

    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(product => product.id === id)
        if(indice != -1){
            const productosFiltrados = products.filter(product => product.id != id)
            await fs.writeFile(this.path, JSON.stringify(productosFiltrados))
                return 'Producto eliminado exitosamente'
        }else{
            return 'El producto no existe'
        }
    }
}

