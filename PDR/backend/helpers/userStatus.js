// helpers/checkVendedorStatus.js
import { getUsuarioById } from '../models/user.model.js';

const checkusuarioStatusAndHours = async (req, res, next) => {
    
    const { usuarioId } = req.params;

    try {
        const usuario = await getUsuarioById(usuarioId);

        if (!usuario) {
            return res.status(404).send('usuario no encontrado');
        }

        if (!usuario.status) {
            return res.status(403).send('El usuario está inactivo');
        }

        const now = new Date();
        const currentTime = now.toTimeString().split(' ')[0]; // Obtener HH:MM:SS

        if (currentTime < usuario.horaEntrada || currentTime > usuario.horaSalida) {
            return res.status(403).send('Los productos no están disponibles en este momento');
        }
        
        next();

    } catch (err) {
        console.error('Error al verificar el estado del usuario:', err);
        res.status(500).send('Error del servidor');
    }
};

export default checkusuarioStatusAndHours;
