const { body } = require('express-validator');

const checkEmailAvailable = require('../../utils/checkEmailAvailable');
const checkNameAvailable = require('../../utils/checkNameAvailable');

const registerMiddle = [
    body('email')
        .trim()
        .notEmpty()
            .withMessage('El email es un campo obligatorio.')
        .isEmail()
            .withMessage('Introduce un email válido.')
            .bail()
        .custom(value => checkEmailAvailable(value)),
    body('name')
        .trim()
        .isLength({ min: 2, max: 32 })
            .withMessage('El nombre de usuario debe tener entre 2 y 32 caracteres.')
            .bail()
        .isAlphanumeric('es-ES', {ignore: ' '})
            .withMessage('El nombre solo puede contener letras, números y espacios en blanco.')
            .bail()
        .custom(value => checkNameAvailable(value)),
    body('password')
        .notEmpty()
            .withMessage('La contraseña es un campo obligatorio.')
        .isLength({ max: 256 })
            .withMessage('La contraseña debe tener menos de 256 caracteres.')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false
        }).withMessage('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.'),
    body('passwordConfirmation')
        .notEmpty()
            .withMessage('Por favor, confirma la contraseña.')
        .custom((value, { req }) => { return value === req.body.password; })
            .withMessage('Las contraseñas no coinciden.')
]

module.exports = registerMiddle;