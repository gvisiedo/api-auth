const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

// POST /auth/registro
router.post('/registro', async function(req, res) {
try {
    // 1. Leer nombre, email y password del body
    const nombre = req.body.nombre
    const email = req.body.email
    const password = req.body.password
    // 2. Comprobar si el email ya existe
    const existe = await Usuario.findOne({ email: email })
    if(existe){
        res.status(400).json({error: 'El email ya esta registrado'})
        return
    }
    // 3. Encriptar la contraseña con bcrypt
    const passwordHash = await bcrypt.hash(password, 10)
    // 4. Crear el usuario en la base de datos
    const nuevoUsuario = new Usuario({
        nombre:nombre,
        email: email,
        password: passwordHash
    })
    await nuevoUsuario.save()
    // 5. Devolver el usuario creado
    res.json({nombre: nuevoUsuario.nombre, email: nuevoUsuario.email})
} catch (error) {
    res.status(500).json({error:'Error en el Registro'})
}
})

// POST /auth/login
router.post('/login', async function(req, res) {
  // 1. Leer email y password del body
  // 2. Buscar el usuario por email
  // 3. Comparar la contraseña con bcrypt
  // 4. Generar un JWT
  // 5. Devolver el token
})

module.exports = router
