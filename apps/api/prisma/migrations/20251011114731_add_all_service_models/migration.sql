-- CreateEnum
CREATE TYPE "DatabaseType" AS ENUM ('MYSQL', 'POSTGRESQL');

-- CreateEnum
CREATE TYPE "SSLType" AS ENUM ('LETS_ENCRYPT', 'CUSTOM', 'SELF_SIGNED');

-- CreateTable
CREATE TABLE "EmailAccount" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "quota" INTEGER NOT NULL DEFAULT 250,
    "usedSpace" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailForwarder" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailForwarder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAutoresponder" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailAutoresponder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailFilter" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagedDatabase" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DatabaseType" NOT NULL,
    "host" TEXT NOT NULL DEFAULT 'localhost',
    "port" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagedDatabase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseUser" (
    "id" TEXT NOT NULL,
    "databaseId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "host" TEXT NOT NULL DEFAULT 'localhost',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DatabaseUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabasePrivilege" (
    "id" TEXT NOT NULL,
    "databaseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "privileges" TEXT NOT NULL DEFAULT 'ALL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DatabasePrivilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SSLCertificate" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "type" "SSLType" NOT NULL,
    "certificate" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "chain" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "autoRenew" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SSLCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedIP" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "reason" TEXT,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockedIP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirewallRule" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "protocol" TEXT NOT NULL,
    "source" TEXT,
    "action" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FirewallRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FTPAccount" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "directory" TEXT NOT NULL,
    "quota" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FTPAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiskUsage" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "totalSpace" INTEGER NOT NULL,
    "usedSpace" INTEGER NOT NULL,
    "fileCount" INTEGER NOT NULL DEFAULT 0,
    "lastScan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiskUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BandwidthMetric" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "bytesIn" BIGINT NOT NULL DEFAULT 0,
    "bytesOut" BIGINT NOT NULL DEFAULT 0,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BandwidthMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorMetric" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "visitors" INTEGER NOT NULL DEFAULT 0,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "uniqueIPs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "message" TEXT,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CronJob" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastRun" TIMESTAMP(3),
    "nextRun" TIMESTAMP(3),
    "output" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CronJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TerminalSession" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "commands" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TerminalSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailAccount_email_key" ON "EmailAccount"("email");

-- CreateIndex
CREATE INDEX "EmailAccount_accountId_idx" ON "EmailAccount"("accountId");

-- CreateIndex
CREATE INDEX "EmailForwarder_accountId_idx" ON "EmailForwarder"("accountId");

-- CreateIndex
CREATE INDEX "EmailAutoresponder_accountId_idx" ON "EmailAutoresponder"("accountId");

-- CreateIndex
CREATE INDEX "EmailFilter_accountId_idx" ON "EmailFilter"("accountId");

-- CreateIndex
CREATE INDEX "ManagedDatabase_accountId_idx" ON "ManagedDatabase"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "ManagedDatabase_accountId_name_key" ON "ManagedDatabase"("accountId", "name");

-- CreateIndex
CREATE INDEX "DatabaseUser_databaseId_idx" ON "DatabaseUser"("databaseId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseUser_databaseId_username_key" ON "DatabaseUser"("databaseId", "username");

-- CreateIndex
CREATE INDEX "DatabasePrivilege_databaseId_idx" ON "DatabasePrivilege"("databaseId");

-- CreateIndex
CREATE INDEX "DatabasePrivilege_userId_idx" ON "DatabasePrivilege"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabasePrivilege_databaseId_userId_key" ON "DatabasePrivilege"("databaseId", "userId");

-- CreateIndex
CREATE INDEX "SSLCertificate_domainId_idx" ON "SSLCertificate"("domainId");

-- CreateIndex
CREATE INDEX "BlockedIP_accountId_idx" ON "BlockedIP"("accountId");

-- CreateIndex
CREATE INDEX "BlockedIP_ipAddress_idx" ON "BlockedIP"("ipAddress");

-- CreateIndex
CREATE INDEX "FirewallRule_accountId_idx" ON "FirewallRule"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "FTPAccount_username_key" ON "FTPAccount"("username");

-- CreateIndex
CREATE INDEX "FTPAccount_accountId_idx" ON "FTPAccount"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "DiskUsage_accountId_key" ON "DiskUsage"("accountId");

-- CreateIndex
CREATE INDEX "BandwidthMetric_accountId_idx" ON "BandwidthMetric"("accountId");

-- CreateIndex
CREATE INDEX "BandwidthMetric_date_idx" ON "BandwidthMetric"("date");

-- CreateIndex
CREATE UNIQUE INDEX "BandwidthMetric_accountId_date_key" ON "BandwidthMetric"("accountId", "date");

-- CreateIndex
CREATE INDEX "VisitorMetric_domainId_idx" ON "VisitorMetric"("domainId");

-- CreateIndex
CREATE INDEX "VisitorMetric_date_idx" ON "VisitorMetric"("date");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorMetric_domainId_date_key" ON "VisitorMetric"("domainId", "date");

-- CreateIndex
CREATE INDEX "ErrorLog_domainId_idx" ON "ErrorLog"("domainId");

-- CreateIndex
CREATE INDEX "ErrorLog_timestamp_idx" ON "ErrorLog"("timestamp");

-- CreateIndex
CREATE INDEX "ErrorLog_statusCode_idx" ON "ErrorLog"("statusCode");

-- CreateIndex
CREATE INDEX "CronJob_accountId_idx" ON "CronJob"("accountId");

-- CreateIndex
CREATE INDEX "CronJob_isActive_idx" ON "CronJob"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "TerminalSession_sessionId_key" ON "TerminalSession"("sessionId");

-- CreateIndex
CREATE INDEX "TerminalSession_accountId_idx" ON "TerminalSession"("accountId");

-- CreateIndex
CREATE INDEX "TerminalSession_sessionId_idx" ON "TerminalSession"("sessionId");

-- AddForeignKey
ALTER TABLE "EmailAccount" ADD CONSTRAINT "EmailAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailForwarder" ADD CONSTRAINT "EmailForwarder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailAutoresponder" ADD CONSTRAINT "EmailAutoresponder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailFilter" ADD CONSTRAINT "EmailFilter_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagedDatabase" ADD CONSTRAINT "ManagedDatabase_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseUser" ADD CONSTRAINT "DatabaseUser_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "ManagedDatabase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabasePrivilege" ADD CONSTRAINT "DatabasePrivilege_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "ManagedDatabase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabasePrivilege" ADD CONSTRAINT "DatabasePrivilege_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DatabaseUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SSLCertificate" ADD CONSTRAINT "SSLCertificate_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedIP" ADD CONSTRAINT "BlockedIP_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirewallRule" ADD CONSTRAINT "FirewallRule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FTPAccount" ADD CONSTRAINT "FTPAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiskUsage" ADD CONSTRAINT "DiskUsage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandwidthMetric" ADD CONSTRAINT "BandwidthMetric_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorMetric" ADD CONSTRAINT "VisitorMetric_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorLog" ADD CONSTRAINT "ErrorLog_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CronJob" ADD CONSTRAINT "CronJob_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TerminalSession" ADD CONSTRAINT "TerminalSession_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
