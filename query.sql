SELECT u.id as userId, u.email AS email, u.firstName AS firstName,u.lastName AS lastName,
u.profilePicture AS profilePicture , u.dob AS dob, u.address1 AS address1, u.address2 AS address2, 
u.about AS about, m.id AS mediaId , m.title AS mediaTitle, m.description AS mediaDescription, m.url AS url,
m.type AS 'type' , m.status AS 'status', g.id AS genreId , g.title AS genreTitle
FROM users u
JOIN media m ON u.id = m.userId
JOIN genres g ON m.genreId = g.id
WHERE (SELECT COUNT(*) FROM media m 
WHERE m.type = 'video' AND m.userId  = u.id)>0
