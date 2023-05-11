const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: String,
        required: true,
        set: function(date) {
            return new Date(date).toISOString().substring(0, 10);
        },
        get: function(date) {
            return date;
        }
    },
    genero: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

const Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;
