require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const router = express.Router()



//Conecta com Db Mongo
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })


//Carrega models
const User = require('./models/user')
const Sponsors = require('./models/sponsors')
const Member = require('./models/member')
const Product = require('./models/product')
const Order = require('./models/order')
const Gallery = require('./models/gallery')
const Upload = require('./models/upload')


//Carrega as rotas
const indexRoute = require('./routes/index-route')
const userRoute = require('./routes/user-route')
const sponsorsRoute = require('./routes/sponsors-route')
const memberRoute = require('./routes/member-route')
const productRoute = require('./routes/product-route')
const orderRoute = require('./routes/order-route')
const galerryRoute = require('./routes/gallery-route')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"))
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
)


app.use('/', indexRoute)
app.use('/patrocinadores', sponsorsRoute)
app.use('/usuarios', userRoute)
app.use('/membros',memberRoute)
app.use('/produtos',productRoute)
app.use('/pedidos',orderRoute)
app.use('/galeria', galerryRoute)
app.use(require("./routes/upload-route"))


module.exports = app