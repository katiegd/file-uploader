const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUser(username);
      if (!user) {
        return done(null, false, { message: "Username not found" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserId(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

async function loginGet(req, res, next) {
  res.render("login", { message: null });
}

async function loginPost(req, res, next) {
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.log("There was an error: " + err);
      return next(err);
    }
    if (!user) {
      return res.render("login", { message: "User was not found" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
}

module.exports = {
  loginGet,
  loginPost,
};
