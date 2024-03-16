const { body } = require('express-validator');

const loginMiddle = [
    body('email').trim().notEmpty().isEmail(),
    body('password').notEmpty().isLength({ max: 256 })
]

module.exports = loginMiddle;