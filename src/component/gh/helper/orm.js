import { Prisma, PrismaClient } from "@prisma/client";
import enc from "./encryption";

const prisma = new PrismaClient();
const userPrisma = prisma.$extends({
  model: {
    user: {
      async create(raw) {
        return await prisma.user.create({
          data: { ...raw.data, password: await enc.hashing(raw?.data.password || "password") },
        });
      },
    },
  },
});

const defaultfilter = ["password", "deleted_at", "updated_at", "created_at", "iat", "exp"];

const prismaorm = { get, set, find, responseFilter, findOrCreate, getschema, schemaFilter };
export default prismaorm;

function responseFilter(e, inputFilter = defaultfilter) {
  if (typeof e == "object") {
    if (Array.isArray(e)) {
      return e.map((d) => responseFilter(d, inputFilter));
    } else {
      for (let key of inputFilter) {
        delete e[key];
      }
      return e;
    }
  }
  return e;
}

function schemaFilter(e, inputFilter = defaultfilter) {
  return e.filter((d) => !inputFilter.includes(d.name));
}

async function getschema(input) {
  return Prisma.dmmf.datamodel.models.find((model) => model.name.toLowerCase() == input)?.fields;
}

async function find(model, q = {}) {
  return await prisma[model].findUnique({
    where: q,
  });
}

async function findOrCreate(model, where = {}, create, update = {}) {
  return await prisma[model].upsert({
    where: where,
    update: update,
    create: { ...where, ...create },
  });
}

async function get(model, where = {}) {
  return await prisma[model].findMany({
    where: where,
  });
}

async function set(model, data) {
  if (data?.id) {
    return await userPrisma[model].upsert({
      where: {
        id: data.id,
      },
      update: data,
      create: data,
    });
  } else {
    return await userPrisma[model].create({
      data: data,
    });
  }
}
