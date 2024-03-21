const { query } = require("express-validator");

const verificationMiddle = [
    query('userId').trim().notEmpty().isInt(),
    query('verificationCode').trim().notEmpty().isAlphanumeric().isLength({ max: 30 })
]

module.exports = verificationMiddle;