const Formulario = require("../models/formularioModel");
const Persona = require("../models/personaModel");
const Rol = require("../models/rolModel");

// Obtener todos los formularios
exports.obtenerFormularios = async (req, res, next) => {
  try {
    const formularios = await Formulario.find().populate("rol persona");
    res.status(200).json(formularios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los formularios",
    });
  }
};

// Obtener un formulario por ID
exports.obtenerFormularioPorId = async (req, res, next) => {
  try {
    const formulario = await Formulario.findById(req.params.id).populate(
      "persona"
    );
    res.status(200).json(formulario);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el formulario",
    });
  }
};

// Crear un nuevo formulario
exports.crearFormulario = async (req, res, next) => {
  if (!req.body.descripcion) {
    return res.status(400).json({
      success: false,
      message: "El nombre es obligatorio",
    });
  }

  if (!req.body.estado) {
    return res.status(400).json({
      success: false,
      message: "El estado es obligatorio",
    });
  }

  if (!req.body.rol) {
    return res.status(400).json({
      success: false,
      message: "El rol es obligatorio",
    });
  }

  if (!req.body.persona) {
    return res.status(400).json({
      success: false,
      message: "La persona es obligatoria",
    });
  }

  try {
    const personas = await Persona.find();
    for (let i = 0; i < personas.length; i++) {
      const persona = personas[i];
      if (persona._id == req.body.persona) {
        break;
      } else if (i == personas.length - 1) {
        return res.status(400).json({
          success: false,
          message: "La persona no existe",
        });
      }
    }

    const formulario = await Formulario.create(req.body);
    res.status(201).json(formulario);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear el formulario",
    });
  }
};

// Actualizar un formulario existente
exports.actualizarFormulario = async (req, res, next) => {
  try {
    const formulario = await Formulario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(formulario);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el formulario",
    });
  }
};

// Eliminar un formulario existente
exports.eliminarFormulario = async (req, res, next) => {
  try {
    await Formulario.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Formulario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el formulario",
    });
  }
};

exports.obtenerFormulariosPorPersona = async (req, res, next) => {
  try {
    const formularios = await Formulario.find({
      persona: req.params.id,
    }).populate("persona rol");
    res.status(200).json(formularios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los formularios",
    });
  }
};

exports.aceptarFormulario = async (req, res, next) => {
  try {
    const formulario = await Formulario.findById(req.params.id);
    formulario.estado = "Aceptado";
    await formulario.save();
    res.status(200).json(formulario);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al aceptar el formulario",
    });
  }
};

exports.obtenerPersonaPorRol = async (req, res, next) => {
  try {
    const formularios = await Formulario.find({
      rol: req.params.id,
    }).populate("persona rol");
    res.status(200).json(formularios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los formularios",
    });
  }
};

exports.obtenerPersonaFotografoAceptado = async (req, res, next) => {
  try {
    const nombre = "Fotografo";
    const rol = await Rol.findOne({ nombre });
    const formularios = await Formulario.find({
      rol: rol._id,
      estado: "Aceptado",
    }).populate("persona rol");
    res.status(200).json(formularios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los formularios",
    });
  }
};
