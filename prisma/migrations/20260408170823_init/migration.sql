-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "whatsappPhone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cabinet" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_token_key" ON "Request"("token");
