require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { urlencoded, json } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routers')
const app = express()

app.use(morgan('dev'))
app.use(cors())

const MONGOOSEURI = `mongodb://localhost/dashboard`
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(MONGOOSEURI, mongooseOptions)
const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to mongoDB')
})



app.use(urlencoded({ extended: true }))
app.use(json())

const PORT = 5000
app.use(router)

app.listen(PORT, _ => {
    console.log('Connected at port', PORT)
})
