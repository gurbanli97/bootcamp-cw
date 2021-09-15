// Dependencies
// =============================================================
const Sequelize = require('sequelize')

var sequelize = require("../config/connection.js");
// Require the sequelize library
// Require the connection to the database (connection.js)
// Creates a "Book" model that matches up with DB

var Book = sequelize.define("book", {
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    },
    pages: {
      type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
  });

  // Syncs with DB
  Book.sync();

  // Makes the Book Model available for other files (will also create a table)
  module.exports = Book;