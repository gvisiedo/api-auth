const mongoose = require('mongoose')


const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  genero: { type: String, required: true },
  año: { type: Number, required: true, min: 1000, max: 2025 },
  disponible:{type: Boolean, default: true},
  paginas:{type: Number, default: 0}
})

const Libro= mongoose.model('Libro', libroSchema)
module.exports = Libro