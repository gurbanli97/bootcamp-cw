const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../auth/auth");
const { Product, Category } = require("../dbConfig/models");

router.get("/", async function (req, res) {
  var products = await Product.findAll({
    include: { model: Category, require: false},
    raw: true
  });
  res.render("products", {
    products,
  });
});

router.get("/add", ensureAuthenticated, async function (req, res) {
  let categories = await Category.findAll({ raw: true });
  res.render("productCreate", { array: categories });
});
router.post("/add", ensureAuthenticated, async function (req, res) {
  await Product.create({
    productImg: req.file.path,
    title: req.body.prTitle,
    description: req.body.prDesc,
    price: req.body.prPrice,
    created_by: req.user.id,
    CategoryId: req.body.CategoryId,
  });
  req.flash("success_msg", "Product Created");
  res.redirect("/dashboard");
});

module.exports = router;
