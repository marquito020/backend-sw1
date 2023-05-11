const Usuario = require("../models/usuarioModel");
const jsonwebtoken = require("jsonwebtoken");
const Persona = require("../models/personaModel");
const LoginMovil = require("../models/loginMovil");
const comparePassword = require("../utils/bcrypt").comparePassword;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ mensaje: "Debe proporcionar todos los campos requeridos" });
    }

    const userFound = await Usuario.findOne({ email });
    if (!userFound) {
      return res
        .status(400)
        .json({ mensaje: "El email no se encuentra registrado" });
    }

    /* const passwordMatch = await comparePassword(password, userFound.contraseña);
        if (!passwordMatch) {
            return res.status(400).json({ mensaje: 'La contraseña es incorrecta' });
        } */

    const token = jsonwebtoken.sign(
      { id: userFound._id },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400, // 24 horas
      }
    );
    const user = await Persona.findOne({ usuario: userFound._id }).populate(
      "usuario"
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor al iniciar sesión", error });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ mensaje: "No se ha proporcionado un token" });
  }

  jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: "Token inválido", error });
    }

    req.userId = decoded.id;
    next();
  });
};

const logout = async (req, res) => {
  /* const token = req.headers["x-access-token"]; */
  const { persona } = req.body;
  await LoginMovil.deleteOne({ persona });
  /* if (!token) {
    return res.status(401).json({ mensaje: "No se ha proporcionado un token" });
  } */

  /* jsonwebtoken.destroy(token); */

  res.status(200).json({ mensaje: "Sesión cerrada" });
};

const loginMovil = async (req, res) => {
  try {
    const { persona, token } = req.body;
    if (!persona || !token) {
      return res
        .status(400)
        .json({ mensaje: "Debe proporcionar todos los campos requeridos" });
    }

    const loginMovilGuardado = await LoginMovil.create({
      persona,
      token,
    });

    res.status(200).json({ loginMovilGuardado });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error interno del servidor al iniciar sesión", error });
  }
};

module.exports = {
  login,
  verifyToken,
  logout,
  loginMovil,
};
