const dateFns = require("date-fns");
const { formatDistanceToNow, format } = dateFns;
const db = require("../models/queries");

async function indexGet(req, res, next) {
  const currentUser = res.locals.currentUser;
  if (currentUser !== undefined) {
    const userId = currentUser.id;
    const uptoDateUser = await db.findUserId(userId);
    console.log(uptoDateUser.folders);

    const formattedFolders = uptoDateUser.folders.map((folder) => {
      const folderDate = new Date(folder.createdAt);

      const daysAgo = Math.floor(
        (Date.now() - folderDate) / (1000 * 60 * 60 * 24)
      );

      if (daysAgo <= 5) {
        return `${formatDistanceToNow(folderDate, { addSuffix: true })}`;
      } else {
        return format(folderDate, "MM/dd/yyyy");
      }
    });

    res.render("index", {
      errors: [],
      data: {},
      folders: req.user ? uptoDateUser.folders : [],
      folderUpdate: formattedFolders,
    });
  } else {
    res.render("index", { errors: [] });
  }
}

module.exports = {
  indexGet,
};
