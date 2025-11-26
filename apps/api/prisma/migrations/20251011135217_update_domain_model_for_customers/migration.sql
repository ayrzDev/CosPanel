-- CreateEnum
CREATE TYPE "DomainType" AS ENUM ('PRIMARY', 'ADDON', 'SUBDOMAIN', 'PARKED');

-- AlterTable
ALTER TABLE "Domain" ADD COLUMN     "autoRenewSsl" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "dnsConfigured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "documentRoot" VARCHAR(500),
ADD COLUMN     "domainType" "DomainType" DEFAULT 'ADDON',
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentDomainId" TEXT,
ADD COLUMN     "redirectTo" VARCHAR(500),
ADD COLUMN     "redirectType" INTEGER,
ADD COLUMN     "sslExpiryDate" TIMESTAMP(3),
ADD COLUMN     "sslProvider" VARCHAR(100),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Domain_customerId_idx" ON "Domain"("customerId");

-- CreateIndex
CREATE INDEX "Domain_domainType_idx" ON "Domain"("domainType");

-- CreateIndex
CREATE INDEX "Domain_isPrimary_idx" ON "Domain"("isPrimary");

-- CreateIndex
CREATE INDEX "Domain_isActive_idx" ON "Domain"("isActive");

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_parentDomainId_fkey" FOREIGN KEY ("parentDomainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
