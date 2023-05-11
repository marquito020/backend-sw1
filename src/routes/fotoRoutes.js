const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/fotoController');

router.get('/', fotoController.getFotos);
router.post('/', fotoController.createFoto);
router.get('/:id', fotoController.getFoto);
router.put('/:id', fotoController.updateFoto);
router.delete('/:id', fotoController.deleteFoto);

module.exports = router;