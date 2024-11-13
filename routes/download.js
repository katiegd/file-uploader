const express = require("express");

const route = express.Router();
const downloadController = require("../controllers/downloadController");

route.post("/file/:id", downloadController.fileDownloadPost);

module.exports = route;
