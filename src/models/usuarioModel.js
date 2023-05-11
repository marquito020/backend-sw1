const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
