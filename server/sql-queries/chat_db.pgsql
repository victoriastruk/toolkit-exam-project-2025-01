CREATE TABLE "Catalogs" (
    id SERIAL PRIMARY KEY,
    "userId" INT NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "catalogName" VARCHAR(255) NOT NULL
);

CREATE TABLE "Conversations" (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Messages" (
    id SERIAL PRIMARY KEY,
    "conversationId" INT NOT NULL REFERENCES "Conversations"(id) ON DELETE CASCADE,
    "senderId" INT NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "UserConversations" (
    "conversationId" INT NOT NULL REFERENCES "Conversations"(id) ON DELETE CASCADE,
    "userId" INT NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    "blackList" BOOLEAN DEFAULT FALSE,
    "favoriteList" BOOLEAN DEFAULT FALSE,
    PRIMARY KEY ("conversationId", "userId")
);

CREATE TABLE "CatalogConversations" (
    "catalogId" INT NOT NULL REFERENCES "Catalogs"(id) ON DELETE CASCADE,
    "conversationId" INT NOT NULL REFERENCES "Conversations"(id) ON DELETE CASCADE,
    PRIMARY KEY ("catalogId", "conversationId")
);
