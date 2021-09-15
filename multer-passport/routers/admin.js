const express = require("express");
const router = express.Router();
const { superior } = require("../auth/auth");
const { User } = require("../dbConfig/models");

router.get("/", superior, async (req, res) => {
  res.render("tables", {
    layout: "nothing",
  });
});

router.get("/api", superior, async (req, res) => {
  var user = await User.findAll();
  res.json(user);
});

router.delete("/delete", superior, async (req, res) => {
  await User.destroy({
    where: {
      id: req.body.askedIDForDelete,
    },
  });

  res.end();
});

router.get("/edit/:id", superior, async (req, res) => {
  var user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render("edit", user.get());
});

router.post("/edit", superior, async (req, res) => {
  if (req.body) {
    if(req.body.password.length > 0){
      var password = req.body.password
    }
    await User.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: password ? password : undefined,
        role: req.body.role,
        profileImg: req.file ? req.file.path : undefined

      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
  }
  req.flash("success_msg", "User updated")
  res.redirect("/admin");
});

module.exports = router;
