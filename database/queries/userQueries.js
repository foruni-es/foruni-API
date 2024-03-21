// El email tiene un dominio válido
const DOMAIN_AVAILABLE = 
`SELECT
    id
FROM university
WHERE SPLIT_PART($1, '@', 2) LIKE CONCAT('%.', domain) OR domain = SPLIT_PART($2, '@', 2)`;

// El email no está en uso
const EMAIL_AVAILABLE = `SELECT true FROM user_account WHERE email = $1`;

// El nombre de usuario está disponible
const NAME_AVAILABLE = `SELECT true FROM user_account WHERE name = $1`;

const REGISTER_USER = 
`INSERT INTO user_account (name, email, university_id, password, verification_code)
VALUES ($1, $2, $3, $4, $5) 
RETURNING id`;

const ACCOUNT_VERIFICATION = 
` UPDATE user_account SET verification_code = null 
WHERE id = $1 AND verification_code = $2`;

const LOGIN = 
`SELECT
    u.id,
    u.password,
    u.name "userName",
    u.verification_code "verificationCode",
    u.banned,
    u.verified,
    uni.id "uniId",
    uni.name "uniName",
    uni.short_name "uniShortName"
FROM user_account u JOIN university uni ON u.university_id = uni.id
WHERE email = $1`;

module.exports = {
    DOMAIN_AVAILABLE,
    EMAIL_AVAILABLE,
    NAME_AVAILABLE,
    REGISTER_USER,
    ACCOUNT_VERIFICATION,
    LOGIN
}