/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const {Router} = express
const contenedor = require('./src/Contenedor')

const manager = new contenedor.Contenedor("./src/file.txt")
let all_prods
const getAll = async() =>{ 
    all_prods = await manager.getAll()
}
getAll()

const app= express()
//const router = Router()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static('public'));


app.get('/show', (req,res) => {

    res.render('pages/productsShow.ejs',{

    })
})

app.get('/', (req,res) => {

    res.render('pages/productsLoad.ejs',{})
})


app.post('/', (req,res) => {
    
    res.send('<script>alert("Información guardada");window.location.href="/"</script>');

    
})





//app.use('/products', router)

const PORT = 8081
const server = app.listen(PORT, () => {
    console.log('Levantado server en express')
})
server.on("error", (error) => console.log(error))