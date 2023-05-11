const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.obtenerEventos);
router.post('/', eventoController.crearEvento);
router.get('/:id', eventoController.obtenerEvento);
router.put('/:id', eventoController.actualizarEvento);
router.delete('/:id', eventoController.eliminarEvento);

router.get('/organizador/:id', eventoController.obtenerEventosPorOrganizador);
/* QR */
router.get('/qr/:id', eventoController.obtenerQrEvento);

module.exports = router;
