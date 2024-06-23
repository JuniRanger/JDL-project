// controllers/product.controller.js
import { sql, poolPromise } from '../config/db-config.js';

export const getProductosByUsuario = async (req, res) => {
    const { vendedorId } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('vendedorId', sql.Int, vendedorId)
            .query('SELECT * FROM Producto WHERE vendedorId = @vendedorId');

        res.json(result.recordset);

    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).send('Error del servidor');
    }
};
