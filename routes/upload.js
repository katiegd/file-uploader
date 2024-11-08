const express = require("express");

const route = express.Router();
const upload = require("../controllers/uploadMiddleware");
const uploadFileController = require("../controllers/uploadFileController");

route.post(
  "/:id",
  upload.single("fileUpload"),
  uploadFileController.uploadFilePost
);

module.exports = route;
