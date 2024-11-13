const express = require("express");

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20000000, //20 MB//
  },
});

const route = express.Router();
const uploadFileController = require("../controllers/uploadFileController");

route.post(
  "/:id",
  upload.single("fileUpload"),
  uploadFileController.uploadFilePost
);

module.exports = route;
