const Contratacion = require('../models/contratacionModel');

exports.getContrataciones = async (req, res, next) => {
    try {
        const contrataciones = await Contratacion.find().populate('persona evento rol');
        res.status(200).json(contrataciones);
    } catch (err) {
        next(err);
    }
};

exports.getContratacion = async (req, res, next) => {
    try {
        const contratacion = await Contratacion.findById(req.params.id).populate('persona evento rol');
        if (!contratacion) {
            return res.status(404).json({
                status: 'fail',
                message: 'Contratación no encontrada',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                contratacion,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createContratacion = async (req, res, next) => {
    try {
        const newContratacion = await Contratacion.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                contratacion: newContratacion,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateContratacion = async (req, res, next) => {
    try {
        const contratacion = await Contratacion.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('trabajador evento rol');
        if (!contratacion) {
            return res.status(404).json({
                status: 'fail',
                message: 'Contratación no encontrada',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                contratacion,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteContratacion = async (req, res, next) => {
    try {
        const contratacion = await Contratacion.findByIdAndDelete(req.params.id);
        if (!contratacion) {
            return res.status(404).json({
                status: 'fail',
                message: 'Contratación no encontrada',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};

exports.getContratacionesPorPersona = async (req, res, next) => {
    try {
        const contrataciones = await Contratacion.find({
            persona: req.params.id,
        }).populate('persona evento rol');
        res.status(200).json(contrataciones);
    } catch (err) {
        next(err);
    }
};
