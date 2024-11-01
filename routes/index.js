const express = require("express");

const route = express();

route.get("/", (req, res) => {
  res.render("index", { errors: [], data: {}, folders: req.user.folders });
});

module.exports = route;
