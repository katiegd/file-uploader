const express = require("express");

const route = express.Router();
const deleteController = require("../controllers/deleteController");

route.post("/folder/:id", deleteController.folderDeletePost);

route.post("/file/:id", deleteController.fileDeletePost);

module.exports = route;
