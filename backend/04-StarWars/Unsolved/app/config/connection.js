// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

const { Sequelize } = require('sequelize')
// Requiring mysql package


// Setting up our connection information
var source = {
  localhost: {
    port: 3306,
    host: "localhost",
    username: "root",
    password: "bootcamp2021",
    database: "starwars",
    dialect: 'mysql'
  }
};

// Creating our connection
var connection = new Sequelize(source.localhost)



// Exporting our connection
module.exports = connection;
