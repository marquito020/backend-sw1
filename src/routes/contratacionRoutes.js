const express = require('express');
const router = express.Router();
const contratacionController = require('../controllers/contratacionController');

router.get('/', contratacionController.getContrataciones);
router.post('/', contratacionController.createContratacion);
router.get('/:id', contratacionController.getContratacion);
router.put('/:id', contratacionController.updateContratacion);
router.delete('/:id', contratacionController.deleteContratacion);

router.get('/persona/:id', contratacionController.getContratacionesPorPersona);

module.exports = router;