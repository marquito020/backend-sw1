const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.login);
router.get('/', loginController.verifyToken);

/* Login Movil */
router.post('/movil', loginController.loginMovil);
/* logout */
router.post('/logout', loginController.logout);

module.exports = router;