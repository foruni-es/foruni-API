const { param } = require('express-validator');

const getUniversityMiddle = [
    param('name').notEmpty().isString().isAlphanumeric().isLength({ min: 2, max: 16 })
]

module.exports = getUniversityMiddle;