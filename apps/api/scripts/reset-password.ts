import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const newPassword = process.argv[3] || 'yeniSifre123';
  if (!email) {
    console.error('Kullanım: pnpm exec ts-node apps/api/scripts/reset-password.ts test@example.com yeniSifre123');
    process.exit(1);
  }
  const hash = await bcrypt.hash(newPassword, 10);
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