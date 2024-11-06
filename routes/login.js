const express = require("express");

const route = express.Router();
const loginController = require("../controllers/loginController");

route.get("/", loginController.loginGet);
route.post("/", loginController.loginPost);

module.exports = route;
