const db = require("../models/queries");

async function uploadFilePost(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.params.id);
  const name = req.file.filename;
  const size = req.file.size;

  console.log(req.params);
  console.log("file uploaded", req.file);

  await db.addFiletoFolder(userId, folderId, name, size);

  res.send("File Uploaded successfully");
}

module.exports = {
  uploadFilePost,
};
