const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    nombre:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    rol:{type: String, default: 'user'}
})

const Usuario = mongoose.model('Usuario', userSchema)
module.exports = Usuario