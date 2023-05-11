const Foto = require("../models/fotoModel");
const Evento = require("../models/eventoModel");
const Persona = require("../models/personaModel");
const LoginMovil = require("../models/loginMovil");
const cloudinary = require("cloudinary").v2;
const FCM = require("fcm-node");

// Controlador para crear una nueva foto
exports.createFoto = async (req, res) => {
  try {
    const { listaImagenOriginales, precio, evento, fotografo } = req.body;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    /* const listaImagenOriginal = req.body.data.listaImagenOriginal; */
    const listaImagenOriginal = listaImagenOriginales;
    console.log("Longitud de Lista" + listaImagenOriginal.length);
    var foto;
    for (let i = 0; i < listaImagenOriginal.length; i++) {
      /* console.log(evento); */
      const nombreEvento = await Evento.findById(evento);
      const resultWithWatermark = await cloudinary.uploader.text(
        "Evento: " + nombreEvento.nombre + " - Precio: $" + precio + "",
        {
          public_id: "marca_de_agua",
          font_style: "italic",
          font_weight: "bold",
          text_decoration: "underline",
          text_style: "stroke",
          font_family: "Arial",
          font_size: 55,
          font_color: "white",
        },
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
          }
        }
      );
      const imagenMarcaAgua = await cloudinary.uploader.upload(
        listaImagenOriginal[i],
        {
          folder: "imagenes_con_marca_agua",
          transformation: [
            {
              overlay: resultWithWatermark,
              x: 10,
              y: 10,
              gravity: "center",
            },
          ],
        },
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
          }
        }
      );

      const personas = await Persona.find();
      var personaEncontrada;
      var fotoValida = false;
      console.log(listaImagenOriginal[i]);
      for (const persona of personas) {
        console.log("Buscando persona");
        try {
          const response = await fetch(
            /* "https://face-recognition.fly.dev/face_recognition", */
            "http://127.0.0.1:8000/face_recognition",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                imagen1: listaImagenOriginal[i],
                imagen2: persona.foto,
              }),
            }
          );
          const data = await response.json();
          const message = data.message;
          console.log(message);
          if (message === "Valido") {
            fotoValida = true;
            personaEncontrada = persona;
            break;
          } else {
            console.log("No se encontro persona");
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (fotoValida) {
        const tokenMovil = await LoginMovil.findOne({
          persona: personaEncontrada._id,
        });
        console.log(tokenMovil);
        const title = "Nueva foto";
        const body = "Se ha subido una nueva foto tuya";
        const token = tokenMovil.token;
        console.log(token);
        var serverKey =
          "AAAAqpLfBLQ:APA91bHv3ScDqlbT3V__n0UuXNPE0_2lcj7WuJV161TyYIjOPE78dYQJ20eU2pzKtuxsCpCrXQUHpbHDVezHGtdgl84ldl8iENaeksaR_TNePK3-GHiiV34GFx2X9QDB2QXOMvLZHhDZ";
        var fcm = new FCM(serverKey);
        var message = {
          to: token, // required fill with device token or topics
          notification: {
            title: title,
            body: body,
          },

          data: {
            //you can send only notification or only data(or include both)
            title: "ok cdfsdsdfsd",
            body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
          },
        };

        fcm.send(message, function (err, response) {
          if (err) {
            console.log("Something has gone wrong!" + err);
            console.log("Respponse:! " + response);
          } else {
            // showToast("Successfully sent with response");
            console.log("Successfully sent with response: ", response);
          }
        });
        const nuevaFoto = new Foto({
          imagenOriginal: listaImagenOriginal[i],
          imagenMarcaAgua: imagenMarcaAgua.url,
          precio,
          persona: personaEncontrada._id,
          evento,
          fotografo,
        });
        foto = await nuevaFoto.save();
      } else {
        const nuevaFoto = new Foto({
          imagenOriginal: listaImagenOriginal[i],
          imagenMarcaAgua: imagenMarcaAgua.url,
          precio,
          evento,
          fotografo,
        });
        foto = await nuevaFoto.save();
      }
    }
    res.status(201).json(foto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "No se pudo crear la foto" });
  }
};

// Controlador para obtener todas las fotos
exports.getFotos = async (req, res) => {
  try {
    const fotos = await Foto.find().populate("persona evento fotografo");
    res.status(200).json(fotos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "No se pudieron obtener las fotos" });
  }
};

// Controlador para obtener una foto específica
exports.getFoto = async (req, res) => {
  try {
    const foto = await Foto.findById(req.params.id).populate(
      "persona evento fotografo"
    );
    if (!foto) {
      return res
        .status(404)
        .json({ success: false, error: "La foto no existe" });
    }
    res.status(200).json(foto);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "No se pudo obtener la foto" });
  }
};

// Controlador para actualizar una foto
exports.updateFoto = async (req, res) => {
  try {
    const foto = await Foto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("persona evento fotografo");

    if (!foto) {
      return res
        .status(404)
        .json({ success: false, error: "La foto no existe" });
    }

    res.status(200).json(foto);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "No se pudo actualizar la foto" });
  }
};

// Controlador para eliminar una foto
exports.deleteFoto = async (req, res) => {
  try {
    const foto = await Foto.findByIdAndDelete(req.params.id);
    if (!foto) {
      return res
        .status(404)
        .json({ success: false, error: "La foto no existe" });
    }
    res.status(200).json({ message: "Foto eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "No se pudo eliminar la foto" });
  }
};

const https = require("https");

function enviarNotificacion(token, title, body) {
  var serverKey =
    "AAAAqpLfBLQ:APA91bHv3ScDqlbT3V__n0UuXNPE0_2lcj7WuJV161TyYIjOPE78dYQJ20eU2pzKtuxsCpCrXQUHpbHDVezHGtdgl84ldl8iENaeksaR_TNePK3-GHiiV34GFx2X9QDB2QXOMvLZHhDZ";
  var fcm = new FCM(serverKey);
  var message = {
    to: token, // required fill with device token or topics
    notification: {
      title: title,
      body: body,
    },

    data: {
      //you can send only notification or only data(or include both)
      title: "ok cdfsdsdfsd",
      body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }
  });
}
