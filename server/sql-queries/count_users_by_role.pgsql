SELECT role, COUNT(*) AS total_users
FROM "Users"
GROUP BY role;

