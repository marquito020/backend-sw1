const Factura = require('../models/factura.Model');

exports.getFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find().populate('persona listaFotos');
        res.status(200).json(facturas);
    } catch (err) {
        next(err);
    }
}

exports.getFactura = async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id).populate('persona listaFotos');
        if (!factura) {
            return res.status(404).json({
                status: 'fail',
                message: 'Factura no encontrada',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                factura,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.createFactura = async (req, res) => {
    try {
        const newFactura = await Factura.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                factura: newFactura,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.getFacturasPorPersona = async (req, res) => {
    try {
        const facturas = await Factura.find({ persona: req.params.id }).populate('persona listaFotos');
        res.status(200).json(facturas);
    } catch (err) {
        next(err);
    }
}