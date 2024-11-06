const express = require("express");

const route = express.Router();
const deleteController = require("../controllers/deleteController");

route.post("/folder/:id", deleteController.folderDeletePost);

module.exports = route;
