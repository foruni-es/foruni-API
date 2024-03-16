const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');

// --------------------------------------------------- MIDDLEWARES ---------------------------------------------------
const isLogged = require('../middlewares/userMiddles/isLogged');
const postThreadMiddle = require('../middlewares/threadMiddles/postThreadMiddle');

// --------------------------------------------------- CONTROLADORES ---------------------------------------------------
const getThreads = require('../controllers/threadController/getThreads');
const getThread = require('../controllers/threadController/getThread');
const postThread = require('../controllers/threadController/postThread');

// --------------------------------------------------- RUTAS ---------------------------------------------------
router.get('/', query('universityId').notEmpty().isInt(), getThreads);

router.get('/:id', param('id').not().isEmpty().isInt(), getThread);

/* router.get('/:id/answers', (req, res) => {
    res.send("Listo");
});*/

router.post('/', [isLogged, ...postThreadMiddle], postThread);

/* router.delete('/:id', (req, res) => {
    res.send("Listo");
});

router.post('/:id/save', (req, res) => {
    res.send("Listo");
});

router.delete('/:id/save', (req, res) => {
    res.send("Listo");
});

router.post('/report', (req, res) => {
    res.send("Listo");
}); */


module.exports = router;