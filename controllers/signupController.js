const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../models/queries");

const validateSignUp = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Please choose a username that has at least 5 characters.")
    .custom(async (username) => {
      const user = await db.findUser(username);
      if (user) {
        throw new Error("Username already in use.");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("password2").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

async function signUpGet(req, res, next) {
  res.render("index", { errors: [], data: {} });
}

async function signUpPost(req, res, next) {
  const errors = validationResult(req);

  // If there are any errors on sign up, re-render the page with the error messages and data filled in.
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(400)
      .render("index", { errors: errors.array(), data: req.body });
  }

  const username = req.body.username;
  const plainPassword = req.body.password;

  try {
    const password = await bcrypt.hash(plainPassword, 10);
    await db.createUser(username, password);
    res.redirect("/login");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  signUpGet,
  signUpPost,
  validateSignUp,
};
