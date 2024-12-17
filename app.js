const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const abmProductos = require('./routes/abmProductos.js'); // Importa las rutas de productos
const abmCategorias = require('./routes/abmCategorias.js'); // Importa las rutas de categorías
const authRoutes = require('./routes/login.js'); // Importa las rutas de autenticación
const carritoRoutes = require('./routes/carrito'); // Importa las rutas del carrito
const ventasRoutes = require('./routes/ventas');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Configura CORS

// Usa las rutas
app.use('/productos', abmProductos); // Asegúrate de que tus rutas tengan prefijo si es necesario
app.use('/categorias', abmCategorias); // Asegúrate de que tus rutas tengan prefijo si es necesario
app.use('/auth', authRoutes); // Asegúrate de que tus rutas tengan prefijo si es necesario
app.use('/carrito', carritoRoutes); // Usar prefijo para carrito
app.use('/ventas', ventasRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
