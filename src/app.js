 
import express from "express";
import productsRouter from './routes/ProductsRouter.js';
import upload from "./config/multer.js";
import cartRouter from "./routes/cartRouter.js";
import { engine } from 'express-handlebars'
import { __dirname } from "./path.js";

console.log(__dirname)

const app = express()
const PORT = 11000

//Middlewares
app.use(express.json())
app.use('/static', express.static(__dirname + '/public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


//Routes
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen subida correctamente")
    } catch (e) {
        res.status(500).send("Error al subir imagen")
    }
}) 
app.get('/static', (req, res) => {
    res.render('home')
})



//Server
app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`)
})


