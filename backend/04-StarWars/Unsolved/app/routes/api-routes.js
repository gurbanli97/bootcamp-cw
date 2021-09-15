// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Character = require("../models/character");
const {Op} = require('sequelize')

// Routes
// =============================================================
module.exports = function(app) {

  // Search for Specific Character (or all characters) then provides JSON
  app.get("/api/:characters?",function(req, res) {

    // If the user provides a specific character in the URL...
    if (req.params.characters) {

      // Then display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      Character.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.characters}%`
          }
        }
      }).then(function(result) {
        return res.json(result);
      });
    }

    // Otherwise...
    else {
      // Otherwise display the data for all of the characters.
      // (Note how we're using the ORM here to run our searches)
      Character.findAll({}).then(function(result) {
        return res.json(result);
      });
    }

  });

  // If a user sends data to add a new character...
  app.post("/api/new", async function(req, res) {

    // Take the request...
    var character = req.body;

    // Then send it to the ORM to "save" into the DB.
    await Character.create({
      name: character.name,
      role: character.role,
      age: character.age,
      forcePoints: character.forcePoints
    });

    res.status(200).json({message: 'Ok'})
  });
};
