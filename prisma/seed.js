const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

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

let role = ["super", "admin", "member"];
let status = ["active", "inactive"];
let devicetype = ["switch"];

async function main() {
  await prisma.userRole.createMany({
    data: [...role.map((d) => ({ name: d }))],
    skipDuplicates: true,
  });

  await prisma.status.createMany({
    data: [...status.map((d) => ({ name: d }))],
    skipDuplicates: true,
  });

  await prisma.deviceType.createMany({
    data: [...devicetype.map((d) => ({ name: d }))],
    skipDuplicates: true,
  });

  await extendPrisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "admin",
      password: "password",
      role_id: 1,
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
