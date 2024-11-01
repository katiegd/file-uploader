const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../models/queries");

async function loginGet(req, res, next) {
  res.render("login");
}

module.exports = {
  loginGet,
};
