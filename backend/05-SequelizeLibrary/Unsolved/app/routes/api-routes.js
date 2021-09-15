// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Book = require("../models/book.js");
const {Op} = require('sequelize')

// Routes
// =============================================================
module.exports = function(app) {

  // Add sequelize code to get all books and return them as JSON
  app.get("/api/all",async (req, res) =>  {
      var result = await Book.findAll({})

      res.json(result)
  });

  // Add sequelize code to get a specific book and return it as JSON
  app.get("/api/:book", async (req, res)  => {
    var result = await Book.findOne({
       where: {
         title: req.params.book
      }
    })

    res.status(200).json(result)
  });

  // Add sequelize code to get all books of a specific genre and return them as JSON
  app.get("/api/genre/:genre", async (req, res) => {
    var result = await Book.findAll({
      where: {
          genre: req.params.genre
     }
   })

   res.status(200).json(result)
  });

  // Add sequelize code to get all books from a specific author and return them as JSON
  app.get("/api/author/:author", async (req, res) => {
    var result = await Book.findAll({
      where: {
          author: req.params.author
     }
   })

   res.status(200).json(result)
  });

  // Add sequelize code to get all "long" books (more than 150 pages) and return them as JSON
  app.get("/api/books/long", async (req, res) =>  {
    var result = await Book.findAll({
      where: {
          pages: {
            [Op.gte]: 150
          }
     }
   })

   res.status(200).json(result)
  });

  // Add sequelize code to get all "short" books (150 pages or less) and return them as JSON
  app.get("/api/books/short", async (req, res) => {

    var result = await Book.findAll({
      where: {
          pages: {
            [Op.lte]: 150
          }
     }
   })
   res.status(200).json(result)
  });

  // Add sequelize code to create a book
  app.post("/api/new", function (req, res)  {
     Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      pages: req.body.pages
    });


    res.status(200)
  });

  // Add sequelize code to delete a book
  app.post("/api/delete/", function(req, res) {
    Book.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200)
  });

};
