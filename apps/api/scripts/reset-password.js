const path = require('path');
// Allow overriding DATABASE_URL via command-line: --db="postgresql://..."
const dbArg = process.argv.find(a => a.startsWith('--db='));
if (dbArg) {
  process.env.DATABASE_URL = dbArg.split('=')[1];
} else {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
}
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const newPassword = process.argv[3] || 'yeniSifre123';
  if (!email) {
    console.error('Kullanım: node scripts/reset-password.js test@example.com yeniSifre123');
    process.exit(1);
  }
  const hash = await bcrypt.hash(newPassword, 10);
  console.log('Using DATABASE_URL:', process.env.DATABASE_URL);
  const sample = await prisma.user.findMany({ select: { email: true }, take: 10 });
  console.log('Sample users:', sample.map(u => u.email));
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    console.error(`Kullanıcı bulunamadı: ${email}`);
    process.exit(2);
  }
  await prisma.user.update({
    where: { email },
    data: { passwordHash: hash },
  });
  console.log(`Password updated for ${email}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
