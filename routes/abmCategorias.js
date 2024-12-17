const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/abmCategorias.js');

// Rutas para categorías
router.post('/', categoryController.createCategory); // Alta
router.put('/:id', categoryController.updateCategory); // Modificar
router.delete('/:id', categoryController.deleteCategory); // Baja
router.get('/', categoryController.getCategories); // Listar

module.exports = router;
