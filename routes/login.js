const express = require('express');
const router = express.Router();
const authController = require('../controllers/login.js');

// Ruta para registrar usuarios
router.post('/register', authController.registerUser);

// Ruta para iniciar sesión
router.post('/login', authController.loginUser);

module.exports = router;
