const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Libro = require('../models/Libro') 

// Ruta pública — cualquiera puede ver los libros
router.get('/', async function(req, res) {
  const libros = await Libro.find()
  res.json(libros)
})

// Ruta protegida — solo usuarios autenticados pueden crear
router.post('/', authMiddleware, async function(req, res) {
  // authMiddleware se ejecuta antes de llegar aquí
  // si el token es válido, req.usuario contiene los datos del usuario
    try {
    const libro = new Libro(req.body)
    await libro.save()
    res.json(libro)
  } catch(error) {
    res.status(500).json({ error: 'Error al crear libro' })
  }

})