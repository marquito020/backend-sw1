// usuarioController.js

const Usuario = require("../models/usuarioModel");
const Persona = require("../models/personaModel");
const bcrypt = require("../utils/bcrypt").hashPassword;

// Registrar un usuario y su persona asociada
exports.registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      email,
      contraseña,
      nombrePersona,
      apellido,
      fechaNacimiento,
      genero,
      telefono,
      direccion,
      foto,
    } = req.body;
    if (!nombrePersona || !apellido || !fechaNacimiento || !genero) {
      return res
        .status(400)
        .json({ mensaje: "Debe proporcionar todos los campos requeridos" });
    }

    if (!nombre || !email || !contraseña) {
      return res
        .status(400)
        .json({ mensaje: "Debe proporcionar todos los campos requeridos" });
    }

    if (contraseña.length < 8) {
      return res
        .status(400)
        .json({ mensaje: "La contraseña debe tener al menos 8 caracteres" });
    }

    // Verificar que el email no esté registrado
    if (await Usuario.findOne({ email })) {
      return res
        .status(400)
        .json({ mensaje: "El email ya se encuentra registrado" });
    }

    // Verificar que el nombre de usuario no esté registrado
    if (await Usuario.findOne({ nombre })) {
      return res
        .status(400)
        .json({ mensaje: "El nombre de usuario ya se encuentra registrado" });
    }

    // Encriptar la contraseña
    const contraseñaEncriptada = await bcrypt(contraseña);

    const personaGuardada = await Persona.create({
      nombre: nombrePersona,
      apellido,
      fechaNacimiento,
      genero,
      telefono,
      direccion,
      foto,
      usuario: await Usuario.create({
        nombre,
        email,
        contraseña: contraseñaEncriptada,
      }),
    });

    res.status(201).json(personaGuardada);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({
          mensaje: "Error de validación al guardar la persona o el usuario",
          error,
        });
    } else {
      res
        .status(500)
        .json({
          mensaje: "Error interno del servidor al registrar el usuario",
          error,
        });
    }
  }
};

// Obtener todos los usuarios y sus personas asociadas
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Persona.find().populate("usuario");
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Hubo un error al obtener los usuarios", error });
  }
};

// Obtener un usuario y su persona asociada
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Persona.findById(req.params.id).populate("usuario");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Hubo un error al obtener el usuario", error });
  }
};

// Actualizar un usuario y su persona asociada
exports.actualizarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      email,
      contraseña,
      nombrePersona,
      apellido,
      fechaNacimiento,
      genero,
    } = req.body;

    // Buscamos el usuario a actualizar en la base de datos
    const usuarioActualizado = await Persona.findById(req.params.id).populate(
      "usuario"
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizamos los datos del usuario y su persona asociada
    usuarioActualizado.usuario.nombre = nombre;
    usuarioActualizado.usuario.email = email;
    usuarioActualizado.usuario.contraseña = contraseña;
    usuarioActualizado.nombre = nombrePersona;
    usuarioActualizado.apellido = apellido;
    usuarioActualizado.fechaNacimiento = fechaNacimiento;
    usuarioActualizado.genero = genero;

    // Guardamos los cambios en la base de datos
    const usuarioGuardado = await usuarioActualizado.save();

    res.status(200).json(usuarioGuardado);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Hubo un error al actualizar el usuario", error });
  }
};

// Eliminar un usuario y su persona asociada
exports.eliminarUsuario = async (req, res) => {
  try {
    // Buscamos el usuario a eliminar en la base de datos
    const personaEliminado = await Persona.findById(req.params.id).populate(
      "usuario"
    );
    if (!personaEliminado) {
      return res.status(404).json({ mensaje: "Persona no encontrado" });
    }

    // Eliminamos el usuario
    await Usuario.findByIdAndDelete(personaEliminado.usuario._id);

    // Eliminamos la persona
    await Persona.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Hubo un error al eliminar el usuario", error });
  }
};
