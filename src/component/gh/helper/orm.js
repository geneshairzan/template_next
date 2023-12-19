import { PrismaClient } from "@prisma/client";
import enc from "./encryption";

const prisma = new PrismaClient();
const userPrisma = prisma.$extends({
  model: {
    user: {
      async create(raw) {
        return await prisma.user.create({ data: { ...raw.data, password: await enc.hashing(raw?.data.password) } });
      },
    },
  },
});

const defaultfilter = ["password", "deleted_at", "updated_at", "created_at", "iat", "exp"];

const prismaorm = { get, set, find, responseFilter, findOrCreate };
export default prismaorm;

function responseFilter(e, inputFilter = defaultfilter) {
  if (typeof e == "object") {
    for (let key of inputFilter) {
      delete e[key];
    }
  }
  return e;
}

async function find(model, q) {
  return await prisma[model].findUnique({
    where: q,
  });
}

async function findOrCreate(model, where, create) {
  return await prisma[model].upsert({
    where: where,
    update: {},
    create: { ...where, ...create },
  });
}

async function get(model, id) {
  return !id
    ? await prisma[model].findMany()
    : await prisma[model].findUnique({
        where: {
          id: id,
        },
      });
}

async function set(model, data) {
  return await userPrisma[model].create({ data });
}
