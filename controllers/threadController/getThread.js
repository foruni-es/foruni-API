const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { ERROR_404, PRODUCTION, ERROR_500 } = require('../../constants');
const { GET_THREAD } = require('../../database/queries/threadQueries');

const getThread = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(404).json({ message: ERROR_404 });

    try {
        
        const data = await db.oneOrNone(GET_THREAD, [req.params.id]);
        
        if (!data) return res.status(404).json({ message: ERROR_404 });

        res.json(data); 

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = getThread;