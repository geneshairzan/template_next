const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const args = process.argv;

async function hashing(raw, cycle = 5) {
  return await bcrypt.hash(raw, cycle);
}

const extendPrisma = prisma.$extends({
  model: {
    user: {
      async create(raw) {
        return await prisma.user.create({
          data: { ...raw.data, password: await hashing(raw?.data.password || "password") },
        });
      },
    },
  },
});

async function main() {
  let argsin = {
    model: args?.[2],
    name: args[3],
  };
  await extendPrisma[argsin.model].create({
    data: {
      name: argsin.name,
    },
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
