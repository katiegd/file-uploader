const middleware = require("../controllers/uploadMiddleware");

async function fileDownloadPost(req, res, next) {
  const filePath = req.body.fileUrl;

  try {
    const fileData = await middleware.downloadFile(filePath);
    console.log(fileData);
    if (fileData) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filePath.split("/").pop()}"`
      );
      res.send(fileData);
    } else {
      res.status(404).send("File not found or error occured");
    }
  } catch (err) {
    console.error("Error downloading file.", err);
    next(err);
  }
}

module.exports = {
  fileDownloadPost,
};
