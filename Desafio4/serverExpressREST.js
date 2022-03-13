/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const {Router} = express
const contenedor = require('./src/Contenedor')

const manager = new contenedor.Contenedor("./src/file.txt")
const all_prods = manager.getAll()

const app= express()
const router = Router()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use("/static",(__dirname +"/public"));


app.get('/', (req,res) => {

    return res.status(200).json(all_prods)

})

app.get('/:id', (req,res) => {
    let product =manager.getById(parseInt(req.params.id))
    if(product.length ===0){
        return res.status(404).json({error:"Product not found"})
    }
    else{
        res.status(200).json({product})
    }

})

app.post('/add', (req,res) => {
    
    manager.save(req.body).then(r=>
        res.status(200).send(r._uid)
    )

})

app.put('/update/:id', (req,res) => {
    let product =manager.getById(parseInt(req.params.id))
    if(product.length ===0){
        return res.status(404).json({error:"Product not found"})
    }
    else{
        product=req.body
        res.status(200).json({product})
    }

})

app.delete('/:id', (req,res) => {
    let product =manager.getById(parseInt(req.params.id))
    if(product.length ===0){
        return res.status(404).json({error:"Product not found"})
    }
    else{
        manager.deleteByID(req.params.id)
        res.status(200).send(`Deleted product with id ${req.params.id}`)
    }

})

app.use('/api/products', router)

const PORT = 8081
const server = app.listen(PORT, () => {
    console.log('Levantado server en express')
})
server.on("error", (error) => console.log(error))