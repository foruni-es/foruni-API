const db = require('../../database/db');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const { ERROR_500, PRODUCTION } = require('../../constants');
const { DOMAIN_AVAILABLE, REGISTER_USER } = require('../../database/queries/userQueries');
const generateRandomCode = require('../../utils/generateRandomCode');

const register = async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ message: result.array()[0].msg });
        
        // id de la universidad vinculada al correo. Se ha comprobado en el middle que el dominio es válido
        const { id: universityId } = await db.one(DOMAIN_AVAILABLE, [req.body.email, req.body.email]);
        
        // Código que el usuario necesitará para verificar el correo
        const verificationCode = generateRandomCode(30);
       
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        const { id: userId } = await db.one(REGISTER_USER, [req.body.name, req.body.email, universityId, encryptedPassword, verificationCode]);

        res.json({ message: userId });

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = register;