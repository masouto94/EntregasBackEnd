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
const {Server} = require('socket.io');
const { get } = require('express/lib/response');

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
    let data = req.body
    data.price = parseInt(data.price)
    manager.save(data).then(r=>
        res.status(200).send('<script>alert("Información guardada");window.location.href="/"</script>')

    )

})

app.post('/:id', (req,res) => {
    let data =req.body
    data.id=parseInt(data.id[0])
    data.price=parseInt(data.price)   
    console.log(data)
    let product =manager.getById(parseInt(data.id))[0]
    console.log(product)
    if(product.length ===0){
        return res.status(404).json({error:"Product not found"})
    }
    else{
        all_prods = all_prods.filter(obj => obj.id!==product.id)
        all_prods.push(data)
        manager.deleteByID(product.id)
        .then(r => manager.save(data).then(r=>{}))
        res.status(200).send('<script>alert("Información Cambiada");window.location.href="/"</script>')
        res.redirect(200, '/') 
        
        
    }

})

app.post('/:id', (req,res) => {
    let data=req.body.id[1]
    console.log("esta es ",data)
    let product =manager.getById(parseInt(data))
    console.log("este es ",product)
    if(product.length ===0){
        return res.status(404).json({error:"Product eee not found"})
    }
    else{
        manager.deleteByID(parseInt(data)).then(r=>{
            getAll()
            res.status(200).send(`<script>alert("Se borró producto ${data}");window.location.href="/"</script>`)
        })
    }

})





const PORT = 3000
server.listen(PORT, () => {
    console.log('Levantado server en express en el puerto: ', PORT)
})
server.on("error", (error) => console.log(error))