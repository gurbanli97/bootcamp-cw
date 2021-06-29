// requiring our Classroom module exported from classroom.js
var Classroom = require("./Classroom.js");

// creating and storing a new classroom object
var firstClass = new Classroom("Jerome", 618);

// calling the addStudent method on our firstClass object
firstClass.addStudent("Amber", "Coding", 4.00);

console.log(firstClass);
