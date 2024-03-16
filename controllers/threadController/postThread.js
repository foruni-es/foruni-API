const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { PRODUCTION, ERROR_500 } = require('../../constants');

const postThread = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({ message: result.array()[0].msg});

    try {
        
        /* const data = await db.manyOrNone(GET_THREADS, [req.query.universityId]); */

        res.json({ threads: "fuunciona" }); 

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = postThread;