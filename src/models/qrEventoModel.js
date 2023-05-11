const mongoose = require('mongoose');

const qrEventoSchema = new mongoose.Schema({
    foto: {
        type: String,
        required: true
    },
    evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
        required: true
    },
});

module.exports = mongoose.model('QrEvento', qrEventoSchema);
