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
let role = [
  { name: "super", id: 99 },
  { name: "admin", id: 1 },
  { name: "master", id: 2 },
  { name: "member", id: 3 },
];

let access = ["private", "public"];
let status = ["active", "inactive"];

async function main() {
  await prisma.userRole.createMany({
    data: role,
    skipDuplicates: true,
  });

  // await prisma.access.createMany({
  //   data: [...access.map((d) => ({ name: d }))],
  //   skipDuplicates: true,
  // });

  await prisma.status.createMany({
    data: [...status.map((d) => ({ name: d }))],
    skipDuplicates: true,
  });

  let user = await extendPrisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    },
  });
  !user &&
    (await extendPrisma.user.create({
      data: {
        email: "admin@admin.com",
        name: "admin",
        password: "password",
        role_id: 1,
      },
    }));
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
