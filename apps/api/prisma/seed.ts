import { PrismaClient, Role, Plan, SSLStatus, Framework } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

async function hash(p: string) {
  return createHash('sha256').update(p).digest('hex');
}

async function main() {
  console.log('🌱 Veritabanı seed başlıyor...\n');

  await prisma.$transaction(async (tx) => {
    const root = await tx.user.upsert({
      where: { email: 'root@umixpanel.local' },
      update: {},
      create: {
        email: 'root@umixpanel.local',
        passwordHash: await hash('rootpass'),
        role: Role.ROOT,
      },
    });
    console.log('✅ Root kullanıcısı: root@umixpanel.local | Şifre: rootpass');

    await tx.user.create({
      data: { email: 'admin1@umixpanel.local', passwordHash: await hash('adminpass'), role: Role.ADMIN },
    });
    await tx.user.create({
      data: { email: 'admin2@umixpanel.local', passwordHash: await hash('adminpass'), role: Role.ADMIN },
    });
    await tx.user.create({
      data: { email: 'reseller@umixpanel.local', passwordHash: await hash('resellerpass'), role: Role.RESELLER },
    });
    const user1 = await tx.user.create({
      data: { email: 'user1@umixpanel.local', passwordHash: await hash('userpass'), role: Role.USER },
    });
    const user2 = await tx.user.create({
      data: { email: 'user2@umixpanel.local', passwordHash: await hash('userpass'), role: Role.USER },
    });

    // Create default hosting plans
    const basicPlan = await tx.hostingPlan.create({
      data: {
        name: 'Basic Hosting',
        description: 'Perfect for small websites and blogs',
        diskSpaceMB: 5120,
        bandwidthMB: 51200,
        emailAccounts: 10,
        databases: 5,
        ftpAccounts: 5,
        subdomains: 10,
        addonDomains: 2,
        parkedDomains: 2,
        features: ['Free SSL Certificate', 'Control Panel', '24/7 Support'],
        monthlyPrice: 9.99,
        yearlyPrice: 99.99,
      },
    });

    const professionalPlan = await tx.hostingPlan.create({
      data: {
        name: 'Professional Hosting',
        description: 'For growing businesses and e-commerce sites',
        diskSpaceMB: 20480,
        bandwidthMB: 204800,
        emailAccounts: 50,
        databases: 25,
        ftpAccounts: 25,
        subdomains: 50,
        addonDomains: 10,
        parkedDomains: 10,
        features: ['Free SSL Certificate', 'Control Panel', '24/7 Priority Support'],
        monthlyPrice: 24.99,
        yearlyPrice: 249.99,
      },
    });

    const businessPlan = await tx.hostingPlan.create({
      data: {
        name: 'Business Hosting',
        description: 'For high-traffic websites and applications',
        diskSpaceMB: 102400,
        bandwidthMB: 1024000,
        emailAccounts: -1,
        databases: -1,
        ftpAccounts: -1,
        subdomains: -1,
        addonDomains: -1,
        parkedDomains: -1,
        features: ['Free SSL Certificate', 'Control Panel', 'Priority Support'],
        monthlyPrice: 49.99,
        yearlyPrice: 499.99,
      },
    });

    const acc1 = await tx.account.create({ data: { ownerId: user1.id, plan: Plan.BASIC as any, status: 'active' } });
    const acc2 = await tx.account.create({ data: { ownerId: user2.id, plan: Plan.BASIC as any, status: 'active' } });

    await tx.domain.createMany({
      data: [
        { accountId: acc1.id, fqdn: 'site1.local', sslStatus: SSLStatus.ACTIVE },
        { accountId: acc2.id, fqdn: 'site2.local', sslStatus: SSLStatus.PENDING },
      ],
    });

    await tx.site.createMany({
      data: [
        { accountId: acc1.id, name: 'WebApp1', framework: Framework.next, repoUrl: 'https://example.com/repo1', deployBranch: 'main' },
        { accountId: acc2.id, name: 'ApiSrv', framework: Framework.node, repoUrl: 'https://example.com/repo2', deployBranch: 'develop' },
      ],
    });

    // Create servers
    const mainServer = await tx.server.create({
      data: {
        adminId: root.id,
        name: 'Main Server 1',
        hostname: 'server1.umixpanel.com',
        ipAddress: '192.168.1.100',
        nameserver1: 'ns1.umixpanel.com',
        nameserver2: 'ns2.umixpanel.com',
        nameserver3: 'ns3.umixpanel.com',
        nameserver4: 'ns4.umixpanel.com',
        maxAccounts: 500,
        currentAccounts: 0,
        isActive: true,
      },
    });

    const backupServer = await tx.server.create({
      data: {
        adminId: root.id,
        name: 'Backup Server',
        hostname: 'server2.umixpanel.com',
        ipAddress: '192.168.1.101',
        nameserver1: 'ns1.umixpanel.com',
        nameserver2: 'ns2.umixpanel.com',
        maxAccounts: 250,
        currentAccounts: 0,
        isActive: true,
      },
    });

    console.log('✅ 2 server oluşturuldu');
    console.log('\n🎉 Seed tamamlandı!\n');
    console.log('📝 ADMIN LOGIN:');
    console.log('   Email: root@umixpanel.local');
    console.log('   Şifre: rootpass\n');
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
