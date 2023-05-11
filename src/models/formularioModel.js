const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formularioSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    }
});

module.exports = mongoose.model('Formulario', formularioSchema);
