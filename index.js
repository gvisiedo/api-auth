const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.log('Error de conexión:', error))

// Rutas
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

const librosRoutes = require('./routes/libros')
app.use('/libros', librosRoutes)

app.listen(3000, function() {
  console.log('Servidor corriendo en http://localhost:3000')
})