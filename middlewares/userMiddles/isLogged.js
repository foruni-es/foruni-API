const db = require('../../database/db');
const jwt = require('jsonwebtoken');
const { ERROR_401, PRODUCTION } = require('../../constants');

const isLogged = async (req, res, next) => {

    try {
        // Si el usuario no esta logueado, req.cookies.user = undefined
        if (!req.cookies.user) return res.status(401).json({ message: ERROR_401 });
        // si el token no es valido, va al catch.
        // Se establece el algoritomo HS256 para desencriptar. En caso de no indicarlo, se usaría el que viene especificado en el jwt, lo que podria provocar un fallo de seguridad
        const token = jwt.verify(req.cookies.user, process.env.TOKEN_SECRET, { algorithms: ['HS256'] });
        // Si el usuario está baneado
        const user = await db.oneOrNone('SELECT true FROM user_account WHERE banned = true AND id = $1', [token.userId]);
        if (user !== null) return res.status(401).json({ message: 'Tu cuenta ha sido bloqueda por incumplir las Normas de la Comunidad.' });
        
        req.userId = token.userId;
        req.uniId = token.uniId;
        
        next();

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        return res.status(401).json({ message: ERROR_401 });
    }
}

module.exports = isLogged;