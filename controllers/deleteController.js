const db = require("../models/queries");
const middleware = require("../controllers/uploadMiddleware");

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

async function fileDeletePost(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.body.folderId);
  const fileId = parseInt(req.body.fileId);
  const filePath = req.body.fileUrl;

  try {
    await db.deleteFile(fileId, folderId, userId);
    await middleware.deleteFile(filePath);

    res.redirect(`/folder/${folderId}`);
  } catch (err) {
    console.error("Error deleting file.", err);
    next(err);
  }
}

module.exports = {
  folderDeletePost,
  fileDeletePost,
};
