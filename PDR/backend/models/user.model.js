// user.model.js
import { sql, poolPromise } from '../config/db-config.js';


// devolver id_login para meter a la tabla 
export const insertLogin = async (correo_electronico, hashPassword) => {
    try {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database connection failed');

        const result = await pool.request()
            .input('correo_electronico', sql.VarChar, correo_electronico)
            .input('contraseña', sql.VarChar, hashPassword)
            .query('INSERT INTO Logi_n (correo_electronico, contraseña) OUTPUT INSERTED.id_login VALUES (@correo_electronico, @contraseña)');

        return result.recordset[0].id_login;
    } catch (err) {
        console.error('Error al insertar datos de inicio de sesión:', err);
        throw err;
    }
};

export const createUsuario = async (nombre, apellido, correo_electronico, telefono, id_login) => {
    try {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database connection failed');

        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('apellido', sql.VarChar, apellido)
            .input('correo_electronico', sql.VarChar, correo_electronico)
            .input('telefono', sql.VarChar, telefono)
            .input('id_login', sql.Int, id_login)
            .query('INSERT INTO Usuario (nombre, apellido, correo_electronico, telefono, id_login) VALUES (@nombre, @apellido, @correo_electronico, @telefono, @id_login)');
            
    } catch (err) {
        console.error('Error al insertar datos del usuario:', err);
        throw err;
    }
};

export const getUsuarioById = async (id) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Usuario WHERE id_usuario = @id_usuario');

        return result.recordset[0];
    } catch (err) {
        console.error('Error al obtener el usuario por ID:', err);
        throw err;
    }
};
