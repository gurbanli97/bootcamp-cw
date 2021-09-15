const express = require("express");
const ExpressHandlebars = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const { sequelize } = require("./dbConfig/models");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const cors = require('cors');

const app = express();
// public
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const passport = require("passport");

// engine
app.engine(
  ".hbs",
  ExpressHandlebars({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// utility middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var storege = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let ext = "." + file.originalname.split(".").slice(-1);
    cb(null, "profile-image" + "-" + Date.now() + ext);
  },
});

var upload = multer({
  storage: storege,
});

app.use(upload.single("profile-photo"));

app.use(
  session({
    name: "yoxlayan",
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
    },
  })
);

app.use(cors());
app.options('*', cors());

require("./auth/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routers
app.use("/", require("./routers/index"));
app.use("/users", require("./routers/users"));
app.use("/admin", require("./routers/admin"));
app.use("/product", require("./routers/product"));
app.use("/category", require("./routers/category"));

const port = process.env.PORT || 4000;

sequelize.sync({ force: false }).then(function () {
  app.listen(port, () => console.log(`App listening on PORT ${port}!`));
});
