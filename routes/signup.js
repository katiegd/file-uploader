const express = require("express");

const route = express.Router();
const signUpController = require("../controllers/signupController");

route.get("/", signUpController.signUpGet);
route.post("/", signUpController.validateSignUp, signUpController.signUpPost);

module.exports = route;
