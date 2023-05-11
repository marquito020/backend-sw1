const Rol = require('../models/rolModel');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Rol.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRol = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const rol = new Rol({ nombre, descripcion });
    if (rol.nombre == null || rol.nombre == '') {
        return res.status(400).json({ message: 'El nombre del rol es requerido' });
    }

    if (rol.descripcion == null || rol.descripcion == '') {
        return res.status(400).json({ message: 'La descripción del rol es requerida' });
    }

    if (await Rol.findOne({ nombre: rol.nombre })) {
        return res.status(400).json({ message: 'El rol ya existe' });
    }

    try {
        const newRol = await rol.save();
        res.status(201).json(newRol);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRol = async (req, res) => {
    try {
        const rol = await Rol.findById(req.params.id);
        if (rol == null) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRol = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const rol = { nombre, descripcion };

    try {
        const updatedRol = await Rol.findByIdAndUpdate(req.params.id, rol, { new: true });
        if (updatedRol == null) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(updatedRol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRol = async (req, res) => {
    try {
        const rol = await Rol.findByIdAndDelete(req.params.id);
        if (rol == null) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};