// Como la dependencia jsonwebtoken no nos permite trabajar con async-await,
// vamos a escribir nuestra propia promesa para poder utilizarlo
const jwt = require("jsonwebtoken");
const { PRODUCTION } = require("../constants");

// esta funcion recibe como parametros toda la informacion que queremos que contenga el token
const generateJWT = (userId, uniId) => {
    return new Promise ( (resolve, reject) => {
        // payload es el objeto que va a contener la informacion que pasamos a la funcion como parametros
        const payload = { 
            userId,
            uniId
        }; 
        // generamos un token con fecha de expiracion. 
        // Por defecto, el algoritmo de encriptacion es HS256
        // El tiempo de expiracion del token se mide en segundos si introducimos un valor numerico. Lo establecemos en 30 dias
        jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 30 * 24 * 60 * 60 }, (error, token) => { 
            
            if (error) {
                if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
                reject('Se ha producido un error al generar el token');
            }

            resolve(token);
        });
    })
}

module.exports = generateJWT;