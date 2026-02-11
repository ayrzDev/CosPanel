-- CreateTable
CREATE TABLE "MailingList" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MailingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailingListMember" (
    "id" TEXT NOT NULL,
    "mailingListId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MailingListMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainAlias" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoxTrapper" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whitelist" JSONB NOT NULL DEFAULT '[]',
    "blacklist" JSONB NOT NULL DEFAULT '[]',
    "challenge" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoxTrapper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailDefault" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "action" TEXT NOT NULL DEFAULT 'forward',
    "forwardTo" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailDefault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTracking" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "recipient" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),

    CONSTRAINT "EmailTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calendar" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "events" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailEncryption" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "publicKey" TEXT,
    "privateKey" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailEncryption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpamFilter" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "spamScore" INTEGER NOT NULL DEFAULT 5,
    "whiteList" JSONB NOT NULL DEFAULT '[]',
    "blackList" JSONB NOT NULL DEFAULT '[]',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpamFilter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityScan" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "scanType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "findings" JSONB NOT NULL DEFAULT '[]',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "SecurityScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PHPVersion" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "iniSettings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PHPVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstalledApp" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT,
    "path" TEXT NOT NULL,
    "installDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstalledApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorPage" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "errorCode" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MimeType" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MimeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "contactInfo" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "path" VARCHAR(1000) NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" VARCHAR(200),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "checksum" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "blurhash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitRepo" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remoteUrl" TEXT,
    "branch" TEXT DEFAULT 'main',
    "lastCommit" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitRepo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebDisk" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "mountPoint" VARCHAR(255) NOT NULL,
    "protocol" TEXT NOT NULL DEFAULT 'webdav',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebDisk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MailingList_email_key" ON "MailingList"("email");

-- CreateIndex
CREATE INDEX "MailingList_accountId_idx" ON "MailingList"("accountId");

-- CreateIndex
CREATE INDEX "MailingListMember_mailingListId_idx" ON "MailingListMember"("mailingListId");

-- CreateIndex
CREATE UNIQUE INDEX "DomainAlias_alias_key" ON "DomainAlias"("alias");

-- CreateIndex
CREATE INDEX "DomainAlias_domainId_idx" ON "DomainAlias"("domainId");

-- CreateIndex
CREATE INDEX "BoxTrapper_accountId_idx" ON "BoxTrapper"("accountId");

-- CreateIndex
CREATE INDEX "BoxTrapper_email_idx" ON "BoxTrapper"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailDefault_accountId_key" ON "EmailDefault"("accountId");

-- CreateIndex
CREATE INDEX "EmailDefault_accountId_idx" ON "EmailDefault"("accountId");

-- CreateIndex
CREATE INDEX "EmailTracking_accountId_idx" ON "EmailTracking"("accountId");

-- CreateIndex
CREATE INDEX "EmailTracking_email_idx" ON "EmailTracking"("email");

-- CreateIndex
CREATE INDEX "EmailTracking_status_idx" ON "EmailTracking"("status");

-- CreateIndex
CREATE INDEX "Calendar_accountId_idx" ON "Calendar"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailEncryption_email_key" ON "EmailEncryption"("email");

-- CreateIndex
CREATE INDEX "EmailEncryption_accountId_idx" ON "EmailEncryption"("accountId");

-- CreateIndex
CREATE INDEX "SpamFilter_accountId_idx" ON "SpamFilter"("accountId");

-- CreateIndex
CREATE INDEX "SpamFilter_email_idx" ON "SpamFilter"("email");

-- CreateIndex
CREATE INDEX "SecurityScan_accountId_idx" ON "SecurityScan"("accountId");

-- CreateIndex
CREATE INDEX "SecurityScan_status_idx" ON "SecurityScan"("status");

-- CreateIndex
CREATE INDEX "PHPVersion_accountId_idx" ON "PHPVersion"("accountId");

-- CreateIndex
CREATE INDEX "InstalledApp_accountId_idx" ON "InstalledApp"("accountId");

-- CreateIndex
CREATE INDEX "ErrorPage_accountId_idx" ON "ErrorPage"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "ErrorPage_accountId_errorCode_key" ON "ErrorPage"("accountId", "errorCode");

-- CreateIndex
CREATE INDEX "MimeType_accountId_idx" ON "MimeType"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "MimeType_accountId_extension_key" ON "MimeType"("accountId", "extension");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_accountId_key" ON "UserPreference"("accountId");

-- CreateIndex
CREATE INDEX "UserPreference_accountId_idx" ON "UserPreference"("accountId");

-- CreateIndex
CREATE INDEX "File_accountId_idx" ON "File"("accountId");

-- CreateIndex
CREATE INDEX "File_path_idx" ON "File"("path");

-- CreateIndex
CREATE INDEX "Image_fileId_idx" ON "Image"("fileId");

-- CreateIndex
CREATE INDEX "GitRepo_accountId_idx" ON "GitRepo"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "GitRepo_accountId_name_key" ON "GitRepo"("accountId", "name");

-- CreateIndex
CREATE INDEX "WebDisk_accountId_idx" ON "WebDisk"("accountId");

-- AddForeignKey
ALTER TABLE "MailingList" ADD CONSTRAINT "MailingList_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MailingListMember" ADD CONSTRAINT "MailingListMember_mailingListId_fkey" FOREIGN KEY ("mailingListId") REFERENCES "MailingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainAlias" ADD CONSTRAINT "DomainAlias_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxTrapper" ADD CONSTRAINT "BoxTrapper_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailDefault" ADD CONSTRAINT "EmailDefault_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTracking" ADD CONSTRAINT "EmailTracking_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailEncryption" ADD CONSTRAINT "EmailEncryption_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpamFilter" ADD CONSTRAINT "SpamFilter_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityScan" ADD CONSTRAINT "SecurityScan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PHPVersion" ADD CONSTRAINT "PHPVersion_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstalledApp" ADD CONSTRAINT "InstalledApp_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ErrorPage" ADD CONSTRAINT "ErrorPage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MimeType" ADD CONSTRAINT "MimeType_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitRepo" ADD CONSTRAINT "GitRepo_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebDisk" ADD CONSTRAINT "WebDisk_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
