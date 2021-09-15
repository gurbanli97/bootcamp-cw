const express = require("express");
const { User } = require("../dbConfig/models");
const router = express.Router();
const passport = require("passport");
const { forwardAuthenticated } = require("../auth/auth");

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

router.post("/register", (req, res) => {
  const { firstname, lastname, password, username } = req.body;
  let errors = [];
  if (!firstname || !lastname || !password || !username) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstname,
      lastname,
      password,
      username,
    });
  } else {
    User.findOne({
      where: {
        username: username,
      },
    }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("register", {
          errors,
          firstname,
          lastname,
          password,
          username,
        });
      } else {
        User.create({
          firstname,
          lastname,
          username,
          password,
          profileImg: req.file ? req.file.path : null
        })
          .then((user) => {
            req.flash("success_msg", "You are now registered and can log in");
            res.redirect("/users/login");
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
