// Importar el modelo de Evento
const Evento = require("../models/eventoModel");
const Persona = require("../models/personaModel");
const QrEvento = require("../models/qrEventoModel");
const qrcode = require("qrcode");
const cloudinary = require("cloudinary").v2;

// Controladores para la gestión de eventos
const eventoController = {
  // Obtener todos los eventos
  obtenerEventos: async (req, res) => {
    try {
      const eventos = await Evento.find();
      res.json(eventos);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ mensaje: "Hubo un error al obtener los eventos." });
    }
  },

  // Obtener un evento por ID
  obtenerEvento: async (req, res) => {
    try {
      const evento = await Evento.findById(req.params.id);
      res.json(evento);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error al obtener el evento." });
    }
  },

  // Crear un nuevo evento
  crearEvento: async (req, res) => {
    try {
      const {
        nombre,
        direccion,
        descripcion,
        fechaInicio,
        fechaFin,
        foto,
        organizador,
      } = req.body;
      const nuevoEvento = new Evento({
        nombre,
        direccion,
        descripcion,
        fechaInicio,
        fechaFin,
        foto,
        organizador,
      });
      await nuevoEvento.save();

      const QR = await qrcode.toDataURL(
        process.env.URL_QR_EVENTO + nuevoEvento._id
      );

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const fotoCloudinary = await cloudinary.uploader.upload(QR);

      // Crear un QR para el evento
      const nuevoQrEvento = new QrEvento({
        foto: fotoCloudinary.secure_url,
        evento: nuevoEvento._id,
      });

      await nuevoQrEvento.save();

      res.json(nuevoEvento);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error al crear el evento." });
    }
  },

  // Actualizar un evento existente
  actualizarEvento: async (req, res) => {
    try {
      const { nombre, fechaInicio, fechaFin, organizador /* , asistentes */ } =
        req.body;
      const eventoActualizado = await Evento.findByIdAndUpdate(req.params.id, {
        nombre,
        fechaInicio,
        fechaFin,
        organizador,
      });
      res.json({ mensaje: "El evento se actualizó correctamente." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ mensaje: "Hubo un error al actualizar el evento." });
    }
  },

  // Eliminar un evento existente
  eliminarEvento: async (req, res) => {
    try {
      await Evento.findByIdAndDelete(req.params.id);
      res.json({ mensaje: "El evento se eliminó correctamente." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error al eliminar el evento." });
    }
  },

  obtenerEventosPorOrganizador: async (req, res) => {
    try {
      const eventos = await Evento.find({ organizador: req.params.id });
      res.json(eventos);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ mensaje: "Hubo un error al obtener los eventos." });
    }
  },

  obtenerQrEvento: async (req, res) => {
    try {
      const qrEvento = await QrEvento.findOne({ evento: req.params.id });
      res.json(qrEvento);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Hubo un error al obtener el QR." });
    }
  },
};

module.exports = eventoController;
