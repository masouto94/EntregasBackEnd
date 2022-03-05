const express = require('express')
const contenedor = require('./src/Contenedor')
const manager = new contenedor.Contenedor("./src/file.txt")
const all_ids = manager.getAll().then(prods => prods.id)

const app = express()

app.get("/Productos", (req,res) => {
    res.json(JSON.stringify(manager.getAll()))
})

app.get("/RandomProduct", (req,res) => {
    let randomElement =Math.floor(Math.random() * all_ids.length);

    res.json(JSON.stringify(manager.getById(all_ids[randomElement])))
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log('Levantado server en express')
})
server.on("error", (error) => console.log(error))
