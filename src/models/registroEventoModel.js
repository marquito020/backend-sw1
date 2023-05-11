const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registroEventoSchema = new Schema({
    persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    evento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento',
        required: true
    }/* ,
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    } */
});

module.exports = mongoose.model('RegistroEvento', registroEventoSchema);
