const RegistroEvento = require('../models/registroEventoModel');

// Obtener todos los registros de eventos
exports.getRegistrosEventos = async (req, res) => {
    try {
        const registrosEventos = await RegistroEvento.find().populate('persona evento');
        res.status(200).json(registrosEventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro de evento
exports.createRegistroEvento = async (req, res) => {
    try {
        const nuevoRegistroEvento = new RegistroEvento(req.body);
        const registroEventoGuardado = await nuevoRegistroEvento.save();
        res.status(201).json(registroEventoGuardado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un registro de evento por ID
exports.getRegistrosEvento = async (req, res) => {
    try {
        const registroEvento = await RegistroEvento.findById(req.params.id).populate('persona evento');
        if (!registroEvento) {
            return res.status(404).json({ error: 'Registro de evento no encontrado' });
        }
        res.status(200).json(registroEvento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro de evento
exports.updateRegistroEvento = async (req, res) => {
    try {
        const registroEvento = await RegistroEvento.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('persona evento');
        if (!registroEvento) {
            return res.status(404).json({ error: 'Registro de evento no encontrado' });
        }
        res.status(200).json(registroEvento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro de evento
exports.deleteRegistroEvento = async (req, res) => {
    try {
        const registroEvento = await RegistroEvento.findByIdAndDelete(req.params.id);
        if (!registroEvento) {
            return res.status(404).json({ error: 'Registro de evento no encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRegistrosEventoByPersona = async (req, res) => {
    const { persona } = req.body;
    try {
        const registrosEvento = await RegistroEvento.find({ evento: req.params.id, persona: persona }).populate('persona evento');
        if (!registrosEvento) {
            return res.status(404).json({ error: 'Registro de evento no encontrado' });
        }
        res.status(200).json(registrosEvento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

