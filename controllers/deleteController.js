const db = require("../models/queries");

async function folderDeletePost(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.params.id);

  try {
    await db.deleteFolder(userId, folderId);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting folder.", err);
    next(err);
  }
}

module.exports = {
  folderDeletePost,
};
