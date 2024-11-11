const dateFns = require("date-fns");
const { formatDistanceToNow, format } = dateFns;
const db = require("../models/queries");

async function indexGet(req, res, next) {
  const currentUser = res.locals.currentUser;
  if (currentUser !== undefined) {
    const userId = currentUser.id;
    const uptoDateUser = await db.findUserId(userId);

    const formattedFolders = uptoDateUser.folders.map((folder) => {
      const folderDate = new Date(folder.createdAt);

      const daysAgo = Math.floor(
        (Date.now() - folderDate) / (1000 * 60 * 60 * 24)
      );

      console.log(folder);
      return {
        ...folder,
        fileCount: folder.files ? folder.files.length + " files" : 0 + " files",
        formattedDate:
          daysAgo <= 5
            ? `${formatDistanceToNow(folderDate, { addSuffix: true })}`
            : format(folderDate, "MM/dd/yyyy"),
      };
    });

    res.render("index", {
      errors: [],
      data: {},
      folders: req.user ? formattedFolders : [],
    });
  } else {
    res.render("index", { errors: [] });
  }
}

module.exports = {
  indexGet,
};
