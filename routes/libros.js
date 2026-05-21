const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Libro = require('../models/Libro') 

// Ruta pública — cualquiera puede ver los libros
router.get('/', async function(req, res) {
  const libros = await Libro.find()
  res.json(libros)
})

router.get('/:id', async function(req,res){
  try {
    const libros = await Libro.findById(req.params.id)
    if(!libros){
      res.status(404).json({error: 'Libro no encontrado'})
      return
    }
    res.json(libros)
    
  } catch (error) {
    res.status(500).json({error: 'Libro no encontrado'})
  }
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

router.put('/:id', authMiddleware,async function (req, res ){  
  try {
    const libros = await Libro.findByIdAndUpdate(req.params.id, req.body,{new:true})
    if(!libros){
      res.status(404).json({error: 'Liro no encontrado'})
      return
    }
    res.json(libros)
    
  } catch (error) {
    res.status(500).json({error: 'Error al obtener el libro'})
    
  }
})
router.delete('/:id', authMiddleware, async function(req,res){
  try {
    const libros = await Libro.findByIdAndDelete(req.params.id)
    if(!libros){
      res.status(404).json({error: 'Liro no encontrado'})
      return
    }
    res.json(libros)
  } catch (error) {
    res.status(500).json({error: 'Error al obtener el libro'})
    
  }
})
module.exports = router