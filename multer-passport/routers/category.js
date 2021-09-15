const express = require("express");
const router = express.Router();
const { superior } = require("../auth/auth");
const { Category } = require("../dbConfig/models");

router.get("/add", superior, async function (req, res){
    res.render("categoryCreate")
})
router.post("/add", superior, async function (req, res){
    await Category.create({
        title: req.body.catTitle,
        description: req.body.catDesc,
        UserId: req.user.id,
    })
    req.flash("success_msg", "Category Created")
    res.redirect("/dashboard")
})

module.exports = router