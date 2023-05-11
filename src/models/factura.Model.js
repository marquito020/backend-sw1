const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema({
    listaFotos: [{ type: Schema.Types.ObjectId, ref: 'Foto', required: true}],
    precioTotal: { type: Number, required: true},
    persona: { type: Schema.Types.ObjectId, ref: 'Persona', required: true},
    numeroTarjeta: { type: String, required: true},
    mesVencimientoTarjeta: { type: String, required: true},
    anioVencimientoTarjeta: { type: String, required: true},
    codigoSeguridadTarjeta: { type: String, required: true},
    titularTarjeta: { type: String, required: true},
});

module.exports = mongoose.model('Factura', facturaSchema);
