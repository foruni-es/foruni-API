const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { ERROR_404, PRODUCTION, ERROR_500 } = require('../../constants');
const { GET_THREADS } = require('../../database/queries/threadQueries');

const getThreads = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(404).json({ message: ERROR_404 });

    try {
        
        const data = await db.manyOrNone(GET_THREADS, [req.query.universityId]);

        res.json({ threads: data }); 

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = getThreads;