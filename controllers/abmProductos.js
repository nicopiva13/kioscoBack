const db = require('../models/db.js');

// 1. Alta de producto
exports.createProduct = (req, res) => {
    const { nombre, descripcion, precio, stock, id_categoria, imagen } = req.body;
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, imagen) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, descripcion, precio, stock, id_categoria, imagen], (err, result) => {
        if (err) throw err;
        res.send('Producto creado con éxito');
    });
};

// 2. Modificación de producto
exports.updateProduct = (req, res) => {
    const { nombre, descripcion, precio, stock, id_categoria, imagen } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, imagen = ? WHERE id_producto = ?';
    db.query(sql, [nombre, descripcion, precio, stock, id_categoria, imagen, id], (err, result) => {
        if (err) throw err;
        res.send('Producto actualizado con éxito');
    });
};

// 3. Baja de producto
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id_producto = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Producto eliminado con éxito');
    });
};

// 4. Listar productos
exports.listProducts = (req, res) => {
    console.log("Consulta de productos recibida");
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta', err);
            return res.status(500).send('Error en la consulta');
        }
        console.log('Productos encontrados:', result);
        res.json(result);
    });
};


// 5. Listar productos con categorías
exports.listProductsWithCategories = (req, res) => {
    const sql = `
        SELECT p.*, c.nombre AS categoria_nombre
        FROM productos p
        LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};
