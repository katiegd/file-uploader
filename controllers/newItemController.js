const db = require("../models/queries");

async function newFolderPost(req, res, next) {
  const name = req.body.newFolder;
  const userId = res.locals.id;

  const user = await db.findUserId(userId);
  await db.createNewFolder(userId, name);

  res.render("index", { folders: user.folders, files: user.files });
}

module.exports = {
  newFolderPost,
};
