const db = require('../models/db.js');


// Registrar una nueva venta
exports.registrarVenta = (req, res) => {
    const { id_usuario, total, tipo_pago } = req.body;
    
    if (!id_usuario || !total || !tipo_pago) {
      return res.status(400).send({ mensaje: 'Todos los campos son requeridos' });
    }
  
    const fecha_venta = new Date(); // Fecha actual del servidor
    const sql = 'INSERT INTO ventas (id_usuario, fecha_venta, total, tipo_pago) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [id_usuario, fecha_venta, total, tipo_pago], (err, result) => {
      if (err) {
        console.error('Error al registrar la venta:', err);
        return res.status(500).send({ mensaje: 'Error al registrar la venta' });
      }
      
      res.send({
        mensaje: 'Venta registrada con éxito',
        ventaId: result.insertId
      });
    });
  };