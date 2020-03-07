const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const server = express()

mongoose.connect('mongodb+srv://semana:semana@cluster0-ka2hq.mongodb.net/SemanaOmnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)