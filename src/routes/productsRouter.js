
import { Router } from "express";
import { ProductManager } from "../config/ProductManager.js";


const productsRouter = Router()

const PRODUCTMANAGER = new ProductManager("./src/db/products.json")


productsRouter.get('/', async (req, res) => {
    try{
    const { limit } = req.query
    const productos = await PRODUCTMANAGER.getProducts()
    const limite = parseInt(limit)
        if (limite || limite > 0) { 
            const productosLimite = productos.slice(0, limit)
            res.status(200).send(productosLimite)
            }else{
                res.status(400).send("Error al consultar clientes, por favor ingresar un número válido - Queries");
            }
    }catch (error) {
        res.status(500).send(`Error interno del servidor - Consulta productos: ${error}`)
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try{
        const idProducto = req.params.pid
        const producto = await PRODUCTMANAGER.getProductsById(idProducto)
            if(producto){
                res.status(200).send(producto)
            }else{
                res.status(404).send("Producto no existe")
            }
    }catch(error){
        res.status(500).send(`Error interno del servidor - Consulta producto: ${error}`)
    }
    
})

productsRouter.post('/', async (req, res) => {
    try{
        const producto = req.body
        console.log(producto)
        const mensaje = await PRODUCTMANAGER.addProduct(producto)
            if(mensaje == 'Producto creado exitosamente')
                res.status(200).send(mensaje)
            else{
                res.status(400).send(mensaje)
            }
    }catch(error) {
        res.status(500).send(`Error interno del servidor - Al crear producto: ${error}`)
    }})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProduct = req.body
        const mensaje = await PRODUCTMANAGER.updateProduct(idProducto, updateProduct)
            if (mensaje == 'Producto actualizado exitosamente'){
                res.status(200).send(mensaje)
            } else {
                res.status(404).send(mensaje)
            }
    } catch (error) {
        res.status(500).send(`Error interno del servidor - Al actualizar producto: ${error}`)      
}})

productsRouter.delete('/:pid', async (req, res) => {
    try{
        const idProducto = req.params.pid
        const mensaje = await PRODUCTMANAGER.deleteProduct(idProducto)
            if (mensaje == 'Producto eliminado exitosamente' ){
                res.status(200).send(mensaje)
            }else{
                    res.status(404).send(mensaje)
            } 
        }catch (error) {
            res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
        }})


export default productsRouter