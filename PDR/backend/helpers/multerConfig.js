import multer from 'multer';
import path from 'path';

// // Función para generar el nombre de archivo único
// function generateFileName(file) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     return file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
// }

// Configuración de almacenamiento para Multer
const storageUsuario = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/usuario/');  // Directorio para imágenes de usuarios
    },
    filename: function (req, file, cb) {
        cb(null, generateFileName(file));
    }
});

const storageProductos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/productos/');  // Directorio para imágenes de productos
    },
    filename: function (req, file, cb) {
        cb(null, generateFileName(file));
    }
});

// Middleware de Multer para la carga de archivos de usuario
 const uploadUsuario = multer({
    storage: storageUsuario,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');  // 'image' debe coincidir con el nombre del campo del formulario


// Middleware de Multer para la carga de archivos de productos
 const uploadProductos = multer({
    storage: storageProductos,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');  // 'image' debe coincidir con el nombre del campo del formulario

export default {uploadProductos, uploadUsuario}

