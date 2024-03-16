const db = require("../database/db");
const { NAME_AVAILABLE } = require("../database/queries/userQueries");

const checkNameAvailable = async (name) => {
    // El nombre de usuario está disponible
    const user = await db.oneOrNone(NAME_AVAILABLE, [name]);
    if (user) throw new Error('Ya existe un usuario con ese nombre.');
}    

module.exports = checkNameAvailable;