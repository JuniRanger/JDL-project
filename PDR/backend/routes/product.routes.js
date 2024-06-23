import express from 'express'
const router = express.Router();
import productController from '../controllers/product.controller'
import multer from 'multer';

const storage = multer.memoryStorage(); // Almacenamiento en memoria
const upload = multer ({storage});

// ruta para agregar un producto
router.post('/productos', upload.single('imagen'), productController.agregarProducto);

export default productRouter;