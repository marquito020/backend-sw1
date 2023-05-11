const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.get('/', facturaController.getFacturas);
router.post('/', facturaController.createFactura);
router.get('/:id', facturaController.getFactura);

/* Factura por persona */
router.get('/persona/:id', facturaController.getFacturasPorPersona);

module.exports = router;