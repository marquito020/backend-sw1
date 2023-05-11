// models/eventoModel.js
const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    fechaInicio: {
        type: String,
        required: true,
        set: function(date) {
            return new Date(date).toISOString().substring(0, 10);
        },
        get: function(date) {
            return date;
        }
    },
    fechaFin: {
        type: String,
        required: true,
        set: function(date) {
            return new Date(date).toISOString().substring(0, 10);
        },
        get: function(date) {
            return date;
        }
    },
    foto: {
        type: String,
        required: true,
    },
    organizador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
        required: true,
    },
});

module.exports = mongoose.model('Evento', eventoSchema);
