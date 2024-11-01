const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create user
async function createUser(username, password) {
  try {
    const user = await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          username,
          password,
        },
      });
      await prisma.folder.create({
        data: {
          user: {
            connect: { id: newUser.id },
          },
          name: "main",
          size: 0,
        },
      });
      return newUser;
    });
    return user;
  } catch (err) {
    console.error("Error creating new user and default folder", err);
    throw new Error("User creation failed.");
  }
}

async function findUser(username) {
  return await prisma.user.findUnique({
    where: { username: username },
    include: { folders: true, files: true },
  });
}

async function findUserId(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { folders: true, files: true },
  });
}

async function createNewFolder(userId, name) {
  return await prisma.folder.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      name: name,
      size: 0,
    },
  });
}

module.exports = {
  createUser,
  findUser,
  findUserId,
  createNewFolder,
};
