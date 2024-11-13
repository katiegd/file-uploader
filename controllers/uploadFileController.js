const db = require("../models/queries");
const path = require("path");
const middleware = require("../controllers/uploadMiddleware");

async function uploadFilePost(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.params.id);
  const name = req.file.originalname;
  const size = req.file.size;
  const file = req.file;

  const filePath = path.join(
    currentUser.username,
    folderId.toString(),
    file.originalname
  );

  await middleware.uploadFile(file.buffer, filePath);

  await db.addFiletoFolder(userId, folderId, name, size, filePath);

  res.redirect(`/folder/${folderId}`);
}

module.exports = {
  uploadFilePost,
};
