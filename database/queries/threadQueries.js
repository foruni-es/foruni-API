const GET_THREADS = 
`SELECT 
    t.id, 
    t.user_id "authorId", 
    u.name "authorName",
    u.verified_info "authorVerifiedInfo",
    uni.name "authorUni",
    uni.short_name "authorUniURL",
    t.title, 
    CASE WHEN (LENGTH(t.content) > 256) THEN (SUBSTRING(t.content, 0, 512) || '... (Seguir leyendo)') ELSE t.content END "content",
    NOW() - t.publication_datetime "publicationDatetime"
FROM thread t
JOIN user_account u ON t.user_id = u.id 
JOIN university uni ON u.university_id = uni.id 
WHERE t.university_id = $1 AND t.deleted = false 
AND t.id NOT IN (SELECT thread_id FROM thread_report WHERE admitted = true)
ORDER BY t.publication_datetime DESC`;

const GET_THREAD = 
`SELECT 
    id, 
    user_id "authorId", 
    title, 
    content, 
    publication_datetime "publicationDatetime"
FROM thread
WHERE id = $1 AND deleted = false 
AND id NOT IN (SELECT thread_id FROM thread_report WHERE admitted = true)`;

const POST_THREAD =
`INSERT INTO thread(user_id, title, content, university_id)
VALUES ($1, $2, $3, $4);`;

module.exports = {
    GET_THREADS,
    GET_THREAD,
    POST_THREAD
}