// models/rolModel.js
const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Rol', rolSchema);
