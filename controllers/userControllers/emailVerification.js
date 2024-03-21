const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { ERROR_500, PRODUCTION } = require('../../constants');
const { ACCOUNT_VERIFICATION } = require('../../database/queries/userQueries');

const emailVerification = async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ message: 'No ha sido posible validar tu cuenta.' });

        await db.none(ACCOUNT_VERIFICATION, [req.query.userId, req.query.verificationCode]);

        res.json({ message: 'Tu cuenta ha sido validada correctamente.'})        

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = emailVerification;