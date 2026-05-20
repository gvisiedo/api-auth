const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/auth')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.log('Error de conexión:', error))

// Rutas
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

app.listen(3000, function() {
  console.log('Servidor corriendo en http://localhost:3000')
})