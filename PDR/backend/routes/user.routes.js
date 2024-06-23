import express from 'express';
import { register, login } from '../controllers/user.controller.js'; // Asegúrate de que estas rutas existen

const router = express.Router();

router.post('/register', register);

router.post('/login', login)

export default userRouter;