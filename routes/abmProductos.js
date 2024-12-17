const express = require('express');
const router = express.Router();
const productController = require('../controllers/abmProductos.js');

// Rutas para productos
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.listProducts); // Esta es la ruta que debería funcionar para obtener productos
router.get('/con-categorias', productController.listProductsWithCategories); // Ruta para productos con categorías

module.exports = router;
