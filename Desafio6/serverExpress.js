/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser');
const contenedor = require('./src/Contenedor')

const manager = new contenedor.Contenedor("./src/file.txt")
let all_prods
const getAll = async() =>{ 
    all_prods = await manager.getAll()
}
getAll()


const app= express()
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: "http://0.0.0.0:3000"
    }
})

io.on("connection", (socket) => {
    console.log("Conectado socket")
    socket.emit("Estas conectado")
})

io.on("disconnect", () => {
    console.log("Desconectado")
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static('public'));


app.get('/show', (req,res) => {
    
    res.render('pages/productsShow.ejs',{
        prods:all_prods
    })
})

app.get('/', (req,res) => {
    res.render('pages/productsLoad.ejs',{
        prods:all_prods
    })
})




app.post('/', (req,res) => {
    
    manager.save(req.body).then(r=>
        res.status(200).send('<script>alert("Información guardada");window.location.href="/"</script>')

    )

})

app.put('/', (req,res) => {
    let {data} = req.body
    let product =manager.getById(parseInt(data.id))
    if(product.length ===0){
        return res.status(404).json({error:"Product not found"})
    }
    else{
        
        res.status(200).send('<script>alert("Información editada");window.location.href="/"</script>')

    }

})

app.delete('/', (req,res) => {
    let {data} = req.body
    let product =manager.getById(parseInt(data.id))
    if(product.length ===0){
        return res.status(404).json({error:"Product not found"})
    }
    else{
        manager.deleteByID(req.params.id)
        res.status(200).send(`<script>alert("Se borró producto ${req.body.id}");window.location.href="/"</script>`)
        
    }

})





const PORT = 3000
server.listen(PORT, () => {
    console.log('Levantado server en express en el puerto: ', PORT)
})
server.on("error", (error) => console.log(error))