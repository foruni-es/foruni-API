const { body } = require('express-validator');
const { ERROR_400 } = require('../../constants');

// Comprueba que el vector está formado por enteros no repetidos
const checkUniqueAndInt = (tagsArray) => {

    for (let i = 0; i < tagsArray.length; i++) {
        
        if (!Number.isInteger(tagsArray[i])) throw new Error (ERROR_400);

        // Comprobación de elementos repetidos
        if (i < tagsArray.length - 1) // El último elemento del array no se comprueba
            for (let j = i + 1; j < tagsArray.length; j++)
                if (tagsArray[i] === tagsArray[j]) throw new Error (ERROR_400);
    }

    return true;
}

const postThreadMiddle = [
    body('title')
        .isString()
            .withMessage(ERROR_400)
        .trim() 
        .notEmpty()
            .withMessage('El título del mensaje es un campo obligatorio.')
        .isLength({ max: 256 })
            .withMessage('La longitud del título no puede superar los 256 caracteres.'),
    body('content')
        .optional()
        .isString()
            .withMessage(ERROR_400)
        .trim()
        .isLength({ max: 4096 })
            .withMessage('El contenido del mensaje no puede superar los 4096 caracteres.'),
    body('universityId')
        .notEmpty()
            .withMessage('Es obligatorio indicar la universidad donde quieres publicar el mensaje.')
        .isInt()
            .withMessage(ERROR_400),
    body('tags')
        .optional()
        .isArray({ min: 0, max: 5 })
            .withMessage('Puedes elegir hasta cinco etiquetas.')
            .bail()
        .custom((value) => checkUniqueAndInt(value))
]

module.exports = postThreadMiddle;