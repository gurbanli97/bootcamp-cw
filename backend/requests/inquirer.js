var inquirer = require('inquirer');
var myPass = 3333
inquirer
  .prompt([
    {
        type: "input",
        message: "What is your name?",
        name: "username"
      },
      {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
      },
      // Here we create a basic password-protected text prompt.
      {
        type: "password",
        message: "Set your password",
        name: "password"
      },
      {
        type: "checkbox",
        name: "purpose",
        message: "what is purpose of your visit?",
        choices: ["for fun", "education", "work"]
      }
     
  ])
  .then(answers => {
    if(answers.password == myPass) {
        console.log('Correct password')
    }else {
        console.log('Incorrect password')

    }
  });
  