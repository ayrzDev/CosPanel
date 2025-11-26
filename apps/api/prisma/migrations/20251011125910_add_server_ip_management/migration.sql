-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "serverId" TEXT;

-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "hostname" VARCHAR(255) NOT NULL,
    "ipAddress" VARCHAR(45) NOT NULL,
    "nameserver1" VARCHAR(255),
    "nameserver2" VARCHAR(255),
    "nameserver3" VARCHAR(255),
    "nameserver4" VARCHAR(255),
    "maxAccounts" INTEGER NOT NULL DEFAULT 100,
    "currentAccounts" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IpAddress" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "ipAddress" VARCHAR(45) NOT NULL,
    "isShared" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "customerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IpAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Server_adminId_idx" ON "Server"("adminId");

-- CreateIndex
CREATE INDEX "Server_isActive_idx" ON "Server"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "IpAddress_ipAddress_key" ON "IpAddress"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "IpAddress_customerId_key" ON "IpAddress"("customerId");

-- CreateIndex
CREATE INDEX "IpAddress_serverId_idx" ON "IpAddress"("serverId");

-- CreateIndex
CREATE INDEX "IpAddress_customerId_idx" ON "IpAddress"("customerId");

-- CreateIndex
CREATE INDEX "IpAddress_isActive_idx" ON "IpAddress"("isActive");

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAddress" ADD CONSTRAINT "IpAddress_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAddress" ADD CONSTRAINT "IpAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;
