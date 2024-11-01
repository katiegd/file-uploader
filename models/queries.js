const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create user
async function createUser(username, password) {
  return await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
}

async function findUser(username) {
  return await prisma.user.findUnique({
    where: { username: username },
  });
}

module.exports = {
  createUser,
  findUser,
};
