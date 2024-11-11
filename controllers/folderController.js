const db = require("../models/queries");
const dateFns = require("date-fns");
const { formatDistanceToNow, format } = dateFns;

async function folderGet(req, res, next) {
  const currentUser = res.locals.currentUser;
  const userId = parseInt(currentUser.id);
  const folderId = parseInt(req.params.id);

  const currentFolder = await db.findFolder(folderId, userId);
  const formattedFiles = currentFolder.files.map((file) => {
    const fileDate = new Date(file.createdAt);
    const daysAgo = Math.floor((Date.now() - fileDate) / (1000 * 60 * 60 * 24));

    const size = file.size;

    const formatFileSize = (bytes) => {
      if (bytes >= 1e9) {
        return (bytes / 1e9).toFixed(2) + " GB";
      } else if (bytes >= 1e6) {
        return (bytes / 1e6).toFixed(2) + " MB";
      } else if (bytes >= 1e3) {
        return (bytes / 1e3).toFixed(2) + " KB";
      } else {
        return bytes + " bytes";
      }
    };

    return {
      date:
        daysAgo <= 5
          ? `${formatDistanceToNow(fileDate, { addSuffix: true })}`
          : format(fileDate, "MM/dd/yyyy"),
      size: formatFileSize(size),
    };
  });

  try {
    const folder = await db.findFolder(folderId, userId);
    console.log(folder);
    res.render("viewFolder", {
      folder: folder,
      formattedFile: formattedFiles,
    });
  } catch (err) {
    console.error("Error deleting folder.", err);
    next(err);
  }
}

module.exports = {
  folderGet,
};
