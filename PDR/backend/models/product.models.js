import {sql, poolPromise} from '../config/db-config'

const insertProducto = async (nombre, descripcion, precio, cantidad) => {
    try {
        const pool = await poolPromise;
        const result = await poo.request()
            .input('nombre', sql.VarChar(50), nombre)
            .input('descripcion', sql.Text, descripcion)
            .input('precio', sql.Decimal(10, 2), precio)
            .input('cantidad', sql.Int, cantidad)
            .query('INSERT INTO Producto (nombre, descripcion, precio, cantidad) VALUES (@nombre, @descripcion, @precio, @cantidad); SELECT SCOPE_IDENTITY() AS insertId;');

        return result.recordset;

    } catch (err) {
        console.error('Error al insertar producto:', err);
        throw err;
    }
};

export default insertProducto