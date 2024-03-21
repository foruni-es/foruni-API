const db = require('../../database/db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const { ERROR_500, PRODUCTION, ERROR_LOGIN } = require('../../constants');
const { LOGIN } = require('../../database/queries/userQueries');
const generateJWT = require('../../utils/generateJWT');

const login = async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(404).json({ message: ERROR_LOGIN });
        // No existe un usuario con el email indicado
        const user = await db.oneOrNone(LOGIN, [req.body.email]);
        if (!user) return res.status(404).json({ message: ERROR_LOGIN });
        // La contraseña no es correcta
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(404).json({ message: ERROR_LOGIN });
        // El usuario no ha validado su cuenta desde el correo de validación
        // if (user.verificationCode !== null) return res.status(401).json({ message: 'Por favor, valida tu cuenta.' });
        // El usuario ha sido baneado
        if (user.banned) return res.status(401).json({ message: 'Tu cuenta ha sido bloqueda por incumplir las Normas de la Comunidad.' });

        const token = await generateJWT(user.id, user.uniId);
        res.cookie('user', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // misma duración que el jwt
            httpOnly: process.env.NODE_ENV !== PRODUCTION ? false : true, 
            secure: process.env.NODE_ENV !== PRODUCTION ? false : true, 
            sameSite: process.env.NODE_ENV !== PRODUCTION ? null : 'none'
        }); 

        res.json({
            user: {
                id: user.id,
                name: user.userName,
                verifiedInfo: user.verifiedInfo,
                university: {
                    id: user.uniId,
                    name: user.uniName,
                    shortName: user.uniShortName
                }
            }
        });

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = login;