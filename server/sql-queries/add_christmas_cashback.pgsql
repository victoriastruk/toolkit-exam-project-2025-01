UPDATE "Users" u
SET balance = balance + sub.cashback
FROM (
    SELECT c."userId", SUM(c.prize) * 0.10 AS cashback
    FROM "Contests" c
    JOIN "Users" u2 ON u2.id = c."userId"
    WHERE u2.role = 'customer'
      AND (
           (c."createdAt" >= '2024-12-25' AND c."createdAt" <= '2025-01-14')
       )
    GROUP BY c."userId"
) AS sub
WHERE u.id = sub."userId";

