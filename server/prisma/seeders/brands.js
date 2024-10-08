// prisma/seed.ts
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

prisma.

async function main() {
  // Create example users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
