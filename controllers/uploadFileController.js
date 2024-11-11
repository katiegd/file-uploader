const db = require("../models/queries");

async function uploadFilePost(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.params.id);
  const name = req.file.filename;
  const size = req.file.size;

  await db.addFiletoFolder(userId, folderId, name, size);

  res.redirect(`/folder/${folderId}`);
}

module.exports = {
  uploadFilePost,
};
