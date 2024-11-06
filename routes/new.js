const express = require("express");

const route = express.Router();
const newItemController = require("../controllers/newItemController");

route.post("/folder", newItemController.newFolderPost);

module.exports = route;
