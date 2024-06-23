import { insertLogin, createUsuario } from '../models/user.model.js';
import { encrypt, compare } from '../helpers/handlebcrypt.js';
import { generateToken, verifyToken } from '../helpers/jwTokens.js';
import { sql, poolPromise } from '../config/db-config.js';
import  uploadUsuario  from '../helpers/multerConfig.js';

const register = async (req, res) => {
    const { nombre, apellido, correo_electronico, telefono, contraseña, confirmar_contraseña } = req.body;

    if (!nombre || !apellido || !correo_electronico || !telefono || !contraseña || !confirmar_contraseña) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    if (contraseña !== confirmar_contraseña) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {
        const hashPassword = await encrypt(contraseña);

        try {
            const id_login = await insertLogin(correo_electronico, hashPassword);

            await createUsuario(nombre, apellido, correo_electronico, telefono, id_login);

            res.status(201).send('Usuario registrado exitosamente');
        } catch (err) {
            console.error('Error al insertar datos en la base de datos:', err);
            res.status(500).send('Error al registrar usuario');
        }
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).send('Error al registrar usuario');
    }
};

const login = async (req, res) => {
    const { correo_electronico, contraseña } = req.body;

    if (!correo_electronico || !contraseña) {
        return res.status(400).send('Correo electrónico y contraseña son obligatorios');
    }

    try {
        const pool = await poolPromise;
        const loginResult = await pool.request()
            .input('correo_electronico', sql.VarChar, correo_electronico)
            .query('SELECT * FROM Logi_n WHERE correo_electronico = @correo_electronico');

        if (loginResult.recordset.length === 0) {
            return res.status(401).send('Correo electrónico o contraseña incorrectos');
        }

        const loginData = loginResult.recordset[0];

        const validPassword = await compare(contraseña, loginData.contrasena);
        if (!validPassword) {
            return res.status(401).send('Correo electrónico o contraseña incorrectos');
        }

        const token = generateToken(loginData.id_login);

        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).send('Token inválido');
        }

        res.status(200).json({ token });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).send('Error al iniciar sesión');
    }
};


// Controlador para subir la imagen del perfil de usuario
const uploadProfileImage = (req, res) => {
    uploadUsuario(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        res.status(201).json({ imageUrl: `uploads/usuario/${req.file.filename}` });
    });
};


export { register, login, uploadProfileImage };
