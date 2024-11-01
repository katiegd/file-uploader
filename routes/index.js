const express = require("express");

const route = express();

route.get("/", (req, res) => {
  res.render("index", { errors: [], data: {} });
});

module.exports = route;
