const { PRODUCTION, ERROR_500 } = require("../../constants");

const logout = (req, res) => {
    
    try {

        res.clearCookie('user');
        res.json({ message: "Sesión cerrada correctamente." });

    } catch (error) {
        if (process.env.NODE_ENV !== PRODUCTION) console.log(error);
        res.status(500).json({ message: ERROR_500 });
    }
}

module.exports = logout;