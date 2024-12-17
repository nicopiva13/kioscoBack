const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registerUser = (req, res) => {
    const { nombre, usuario, pass, rol } = req.body;

    // Verificar si el usuario ya existe
    const checkUserQuery = 'SELECT * FROM usuarios WHERE usuario = ?';
    db.query(checkUserQuery, [usuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Cifrar la contraseña antes de guardar
        const hashedPassword = bcrypt.hashSync(pass, 10);

        // Insertar nuevo usuario con la fecha actual
        const sql = 'INSERT INTO usuarios (nombre, usuario, pass, rol, fecha_registro) VALUES (?, ?, ?, ?, NOW())';
        db.query(sql, [nombre, usuario, hashedPassword, rol], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    });
};

// Iniciar sesión
exports.loginUser = (req, res) => {
    const { usuario, pass } = req.body;

    // Verificar si el usuario existe
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    db.query(sql, [usuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        const user = result[0];

        // Verificar la contraseña
        const isPasswordValid = bcrypt.compareSync(pass, user.pass);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear el token JWT con el rol del usuario
        const token = jwt.sign({ id: user.id_usuario, usuario: user.usuario, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    });
};

// Middleware de autenticación
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token no proporcionado');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send('Token inválido');
        req.userId = decoded.id;
        req.userRole = decoded.rol;
        next();
    });
};
