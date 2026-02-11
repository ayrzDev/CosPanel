(async () => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const rows = await prisma.emailAccount.findMany({ take: 10 });
    console.log('FOUND', rows.length);
    console.dir(rows, { depth: 2 });

    await prisma.$disconnect();
  } catch (err) {
    console.error('ERROR', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
