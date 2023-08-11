const jwt = require("jsonwebtoken");
import dotenv from "dotenv";


dotenv.config();

const SECRET = process.env.SECRET;

const generateToken = (payload: any) => {
    return jwt.sign(payload,SECRET)
}

function validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET);
      return decoded;
    } catch (error : unknown) {
        if(error instanceof Error){
            if (error.name === 'TokenExpiredError') {
                // El token ha expirado
                // Realiza una acción apropiada, como redirigir al usuario a iniciar sesión nuevamente
                console.log('El token ha expirado');
              } else {
                // Otro tipo de error al verificar el token
                console.log('Error al verificar el token:', error.message);
              }
              return null;
            }
            else{
                return null
            }
        }
  }


export { generateToken, validateToken }