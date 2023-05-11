const express = require('express');
const router = express.Router();
const registroEventoController = require('../controllers/registroEventoController');

router.get('/', registroEventoController.getRegistrosEventos);
router.post('/', registroEventoController.createRegistroEvento);
router.get('/:id', registroEventoController.getRegistrosEvento);
router.put('/:id', registroEventoController.updateRegistroEvento);
router.delete('/:id', registroEventoController.deleteRegistroEvento);

router.post('/evento/:id', registroEventoController.getRegistrosEventoByPersona);

module.exports = router;