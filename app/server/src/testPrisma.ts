import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const podcasts = await prisma.podcast.findMany();
  console.log(podcasts);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
