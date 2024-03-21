const express = require('express');
const router = express.Router();

// --------------------------------------------------- MIDDLEWARES ---------------------------------------------------
const registerMiddle = require('../middlewares/userMiddles/registerMiddle');
const verificationMiddle = require('../middlewares/userMiddles/verificationMiddle');
const loginMiddle = require('../middlewares/userMiddles/loginMiddle');

// --------------------------------------------------- CONTROLADORES ---------------------------------------------------
const register = require('../controllers/userControllers/register');
const emailVerification = require('../controllers/userControllers/emailVerification');
const login = require('../controllers/userControllers/login');
const logout = require('../controllers/userControllers/logout');

// --------------------------------------------------- RUTAS ---------------------------------------------------
router.post('/register', registerMiddle, register);
router.get('/verification', verificationMiddle, emailVerification);
router.post('/login', loginMiddle, login);
router.get('/logout', logout);
/* router.put('/name', (req, res) => { res.send("hola"); });
router.put('/password', (req, res) => { res.send("hola"); }); */

module.exports = router;