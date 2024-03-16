const db = require("../database/db");
const { DOMAIN_AVAILABLE, EMAIL_AVAILABLE } = require("../database/queries/userQueries");

const checkEmailAvailable = async (email) => {
    // Email con un dominio válido
    const domain = await db.oneOrNone(DOMAIN_AVAILABLE, [email, email]);
    if (!domain) throw new Error('Por favor, usa el email de tu universidad.');
    // El email no está en uso
    const user = await db.oneOrNone(EMAIL_AVAILABLE, [email]); 
    if (user) throw new Error('Ya existe una cuenta con ese email.');
}    

module.exports = checkEmailAvailable;