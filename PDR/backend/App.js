import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Middleware para solicitudes de diferentes dominios
import userRouter from './routes/user.routes.js'; // Rutas de usuario
import productRouter from './routes/product.routes.js'; // rutas de 

// Crear aplicación Express
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Obtener el directorio actual

// Middleware para el manejo de CORS y JSON
app.use(cors());
app.use(express.json());

// Carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, '../Frontend/ventas-app/public')));

// Rutas API
app.use('/api/users', userRouter);
app.use('api/products', productRouter);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});


const port = 4000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`);
});


