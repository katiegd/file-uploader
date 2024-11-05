const db = require("../models/queries");

async function indexGet(req, res, next) {
  const currentUser = res.locals.currentUser;
  if (currentUser !== undefined) {
    const userId = currentUser.id;
    const uptoDateUser = await db.findUserId(userId);

    res.render("index", {
      errors: [],
      data: {},
      folders: req.user ? uptoDateUser.folders : [],
    });
  } else {
    res.render("index", { errors: [] });
  }
}

module.exports = {
  indexGet,
};
