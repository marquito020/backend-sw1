const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rolController');

router.get('/', rolController.getAllRoles);
router.post('/', rolController.createRol);
router.get('/:id', rolController.getRol);
router.put('/:id', rolController.updateRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;
