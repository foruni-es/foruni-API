const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { PRODUCTION, ERROR_500 } = require('../../constants');
const { POST_THREAD } = require('../../database/queries/threadQueries');

const postThread = async (req, res) => {

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).json({ message: result.array()[0].msg });
        
        await db.none(POST_THREAD, [req.userId, req.body.title, req.body.content, req.body.universityId]);

        res.json({ message: 'Tu mensaje ha sido publicado correctamente. Pulsa aquí para verlo o recarga la página.' }); 

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = postThread;