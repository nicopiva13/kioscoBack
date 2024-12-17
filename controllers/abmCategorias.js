const db = require('../models/db.js');

// 1. Alta de Categoría
exports.createCategory = (req, res) => {
    const { nombre } = req.body;
    const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
    db.query(sql, [nombre], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).send('Categoría creada con éxito');
    });
};


// 2. Modificación de Categoría
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const sql = 'UPDATE categorias SET nombre = ? WHERE id_categoria = ?';
    db.query(sql, [nombre, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send('Categoría actualizada con éxito');
    });
};


// 3. Baja de Categoría
exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send('Categoría eliminada con éxito');
    });
};



// 4. Listar Categorías
exports.getCategories = (req, res) => {
    const sql = 'SELECT * FROM categorias';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};




