const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginMovilSchema = new Schema({
    persona : { type: Schema.Types.ObjectId, ref: 'Persona', required: true},
    token : { type: String, required: true},
});

module.exports = mongoose.model('LoginMovil', loginMovilSchema);