import producto from '../models/product.models';
import path from 'path';
import fs from 'fs';
import { sql, poolPromise } from '../config/db-config.js';
import  uploadProductos  from '../helpers/multerConfig.js';


// Controlador para subir la imagen de un producto
export const uploadProductImage = (req, res) => {
    uploadProductos(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        res.status(201).json({ imageUrl: `uploads/productos/${req.file.filename}` });
    });
};

export const agregarProducto = async (req, res) => {
    
    const {nombre, descripcion, precio, tipoCarta, estado, horarioEntrada, horarioSalida} = req.body;
    const image = req.file ? req.file.buffer : null //libreria para manejar archivos tengo que descargar

    try{

        let imagenProduct = null;
        if(image){
            const nombreArchivo = `{Date.now()}_${req.file.originalname}`;
            imagenProducto = await saveImage(imagen, nombreArchivo)
        }

        const producto = await ProductoForm.create({
            nombre,
            descripcion,
            precio,
            tipoCarta,
            estado,
            horarioEntrada,
            horarioSalida,
            imagen: imagenProducto
        })

        res.status(201).json(producto);
    }catch(err){
        console.error('Error al agregar producto: ', error);
        res.status(500).send('Error al guardar producto')
    }
};

export const getProductosByUsuario = async (req, res) => {

    const { usuarioId } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .query('SELECT * FROM Producto WHERE usuarioId = @usuarioId');

        res.json(result.recordset);

    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).send('Error del servidor');
    }
};
