const GET_UNI = 
`SELECT 
    id, 
    name, 
    short_name "shortName"
FROM university 
WHERE short_name = $1`;

const GET_UNI_BY_SEARCH = 
`SELECT 
    id,
    name,
    short_name "shortName"
FROM university
WHERE (unaccent(name) ILIKE unaccent($1) 
OR unaccent(short_name) ILIKE unaccent($2)
OR unaccent(related_term) ILIKE unaccent($3))
AND short_name <> 'inicio' 
ORDER BY name 
LIMIT 5`;

module.exports = {
    GET_UNI,
    GET_UNI_BY_SEARCH
};
