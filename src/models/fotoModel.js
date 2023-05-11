const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fotoSchema = new Schema({
    imagenOriginal: { type: String , required: true },
    imagenMarcaAgua: { type: String , required: true },
    precio: { type: Number , required: true },
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' },
    evento: { type: Schema.Types.ObjectId, ref: 'Evento' , required: true},
    fotografo: { type: Schema.Types.ObjectId, ref: 'Persona', required: true }
});

module.exports = mongoose.model('Foto', fotoSchema);
