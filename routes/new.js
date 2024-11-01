const express = require("express");

const route = express();
const newItemController = require("../controllers/newItemController");

route.post("/folder", newItemController.newFolderPost);

module.exports = route;
