const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let role = ["admin", "user"];
let status = ["active", "inactive"];

async function main() {
  await prisma.userRole.createMany({
    data: [...role.map((d) => ({ name: d }))],
    skipDuplicates: true,
  });

  await prisma.status.createMany({
    data: [...status.map((d) => ({ name: d }))],
    skipDuplicates: true,
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
