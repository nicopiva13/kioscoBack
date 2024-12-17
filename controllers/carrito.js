const db = require('../models/db.js');

// Confirmar compra y registrar productos en el carrito
exports.confirmPurchase = (req, res) => {
    const { productos } = req.body;

    // Verificar que `productos` sea un array
    if (!Array.isArray(productos)) {
        return res.status(400).json({ error: 'Se esperaba un array de productos' });
    }

    productos.forEach((producto) => {
        const { id_producto, nombreProducto, descripcion, cantidad, precio, imagen } = producto;

        // Insertar cada producto en la tabla carrito
        const sqlInsertProducto = 'INSERT INTO carrito (id_producto, nombreProducto, descripcion, cantidad, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sqlInsertProducto, [id_producto,nombreProducto, descripcion, cantidad, precio, imagen], (err, result) => {
            if (err) {
                console.error(`Error al agregar el producto ${nombreProducto} al carrito`, err);
                return res.status(500).json({ error: 'Error al agregar productos al carrito' });
            }
        });
    });

    res.json({ mensaje: 'Compra confirmada y productos registrados en el carrito' });
};

// Obtener todos los productos en el carrito
exports.viewCart = (req, res) => {
    const sql = 'SELECT * FROM carrito';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los productos del carrito' });
        res.json(result);
    });
};

// Agregar un producto al carrito
exports.addToCart = (req, res) => {
    const { nombreProducto, descripcion, cantidad, precio, imagen, id_producto } = req.body; // Incluye id_producto
    const sql = 'INSERT INTO carrito (nombreProducto, descripcion, cantidad, precio, imagen, id_producto) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombreProducto, descripcion, cantidad, precio, imagen, id_producto], (err, result) => {
        if (err) throw err;
        res.send({ mensaje: 'Producto agregado al carrito con éxito' });
    });
};

// Eliminar un producto del carrito
exports.deleteFromCart = (req, res) => {
    const { id_producto } = req.params; // Obtén el id_producto de los parámetros de la URL

    const sql = 'DELETE FROM carrito WHERE id_producto = ?';
    db.query(sql, [id_producto], (err, result) => {
        if (err) {
            console.error(`Error al eliminar el producto ${id_producto} del carrito`, err);
            return res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
        }
        res.send({ mensaje: 'Producto eliminado del carrito con éxito' });
    });
};



// Actualizar cantidad de un producto en el carrito
exports.actualizarCantidad = (req, res) => {
    const { cantidad } = req.body; // Obtén la nueva cantidad del cuerpo de la solicitud
    const { id_producto } = req.params; // Obtén el id_producto de los parámetros de la URL

    const sql = 'UPDATE carrito SET cantidad = ? WHERE id_producto = ?'; // Asegúrate de que el campo en la tabla sea correcto
    db.query(sql, [cantidad, id_producto], (err, result) => {
        if (err) throw err;
        res.send({ mensaje: 'Cantidad actualizada con éxito' });
    });
};


// Vaciar el carrito
exports.emptyCart = (req, res) => {
    const sql = 'DELETE FROM carrito';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al vaciar el carrito:', err);
            return res.status(500).json({ error: 'Error al vaciar el carrito' });
        }
        res.json({ mensaje: 'Carrito vaciado con éxito' });
    });
};

