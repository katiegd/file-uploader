const express = require("express");

const route = express.Router();
const folderController = require("../controllers/folderController");

route.get("/:id", folderController.folderGet);

module.exports = route;
