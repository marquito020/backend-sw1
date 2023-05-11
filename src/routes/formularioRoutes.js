const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

// Obtener todos los formularios
router.get('/', formularioController.obtenerFormularios);

// Obtener un formulario por su ID
router.get('/:id', formularioController.obtenerFormularioPorId);

// Crear un nuevo formulario
router.post('/', formularioController.crearFormulario);

// Actualizar un formulario existente
router.put('/:id', formularioController.actualizarFormulario);

// Eliminar un formulario existente
router.delete('/:id', formularioController.eliminarFormulario);

/* Formulario Persona */
// Obtener todos los formularios de una persona
router.get('/persona/:id', formularioController.obtenerFormulariosPorPersona);

/* Aceptar Formulario */
// Aceptar un formulario
router.put('/aceptar/:id', formularioController.aceptarFormulario);

/* Get Persona por rol */
// Obtener la persona por rol
router.get('/persona/rol/:id', formularioController.obtenerPersonaPorRol);

/* Get Persona Fotografo Aceptado */
// Obtener la persona fotografo aceptado
router.get('/fotografo/persona', formularioController.obtenerPersonaFotografoAceptado);

module.exports = router;
