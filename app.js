const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const path = require("node:path");

const app = express();
require("dotenv").config();

// Set up routers
const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const newRouter = require("./routes/new");
const deleteRouter = require("./routes/delete");
const folderRouter = require("./routes/folders");
const uploadRouter = require("./routes/upload");

// Set up views path and ejs view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Session config
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false })); // For form data

// Current user middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/new", newRouter);
app.use("/upload", uploadRouter);
app.use("/delete", deleteRouter);
app.use("/folder", folderRouter);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`listening on port ${PORT}.`));
