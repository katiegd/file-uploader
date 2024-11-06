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
    include: {
      folders: {
        orderBy: {
          createdAt: "desc",
        },
      },
      files: true,
    },
  });
}

async function findUserId(userId) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      folders: {
        orderBy: {
          createdAt: "desc",
        },
      },
      files: true,
    },
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

async function existingFolder(userId, folderName) {
  await prisma.folder.findFirst({
    where: {
      id: userId,
      name: folderName,
    },
  });
}

async function deleteFolder(userId, folderId) {
  await prisma.folder.delete({
    where: {
      id: folderId,
      userId: userId,
    },
  });
}

async function findFolder(folderId, userId) {
  return await prisma.folder.findFirst({
    where: {
      id: folderId,
      userId: userId,
    },
    include: { files: true },
  });
}

module.exports = {
  createUser,
  findUser,
  findUserId,
  createNewFolder,
  findFolder,
  existingFolder,
  deleteFolder,
};
