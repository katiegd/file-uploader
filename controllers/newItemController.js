const db = require("../models/queries");

async function newFolderPost(req, res, next) {
  const currentUser = res.locals.currentUser;
  const name = req.body.newFolder;
  const userId = currentUser.id;

  try {
    const existingFolder = await db.existingFolder(userId, name);
    if (existingFolder) {
      return res.render("index", {
        folders: currentUser.folders,
        files: currentUser.files,
        error: "A folder with this name already exists.",
      });
    }

    await db.createNewFolder(userId, name);

    res.redirect("/");
  } catch (err) {
    console.error("Error creating new folder.", err);
    next(err);
  }
}

module.exports = {
  newFolderPost,
};
