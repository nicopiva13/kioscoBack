const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/venta.js');

// Ruta para registrar una venta
router.post('/registrar', ventasController.registrarVenta);

module.exports = router;
