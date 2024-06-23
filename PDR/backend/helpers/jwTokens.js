import jwt from 'jsonwebtoken';
const secret = 'your_jwt_secret'; // esta madre deberia estar en .env

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, username: user.username},
        secret, //fimra el token con el secreto
        {expiresIn: '10m'} // el token expira en 10 minutos
    )
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token, secret);

    } catch (err){
        console.log("no se pudo verificar el token", err);
        return null;
    }
}

export {generateToken, verifyToken}