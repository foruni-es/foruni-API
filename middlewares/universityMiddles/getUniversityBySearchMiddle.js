const { query } = require('express-validator');

const getUniversityBySearchMiddle = [
    query('search').trim().notEmpty().isString().isLength({ max: 128 })
]

module.exports = getUniversityBySearchMiddle;