const express = require('express');
const router = express.Router(); // Crear el router
const carritoController = require('../controllers/carrito.js');

router.post('/confirmar', carritoController.confirmPurchase);
router.get('/', carritoController.viewCart);
router.post('/agregar', carritoController.addToCart);
router.put('/:id_producto', carritoController.actualizarCantidad); // Ruta para actualizar cantidad
router.delete('/', carritoController.emptyCart);
router.delete('/:id_producto', carritoController.deleteFromCart);

module.exports = router; // Exportar el router
