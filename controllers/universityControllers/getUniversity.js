const db = require('../../database/db');
const { validationResult } = require('express-validator');

const { ERROR_404, PRODUCTION, ERROR_500 } = require('../../constants');
const { GET_UNI } = require('../../database/queries/universityQueries');

const getUniversity = async (req, res) => {

    try {
        
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(404).json({ message: ERROR_404 });
        
        const data = await db.oneOrNone(GET_UNI, [req.params.name]);
        
        if (!data) return res.status(404).json({ message: ERROR_404 });

        res.json({ university: data });

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = getUniversity;