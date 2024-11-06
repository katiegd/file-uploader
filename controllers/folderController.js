const db = require("../models/queries");

async function folderGet(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.params.id);

  try {
    const folder = await db.findFolder(folderId, userId);
    res.render("viewFolder", { folder: folder });
  } catch (err) {
    console.error("Error deleting folder.", err);
    next(err);
  }
}

module.exports = {
  folderGet,
};
