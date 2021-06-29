var inquirer = require('inquirer')

var userHealth = 70;
var zombieHealth = 15;


function checkHealth() {

  if (userHealth <= 0) {
    console.log('Fatality!User is dead')
    return
  }

  if (zombieHealth <= 0) {
    console.log("Flawless Victory! Zombie is dead")
    return
  }

  play();

}

function play() {
    inquirer
  .prompt([
      {
        type: "list",
        name: "destiny",
        choices: ["1", "2", "3","4","5"],
        message: "Choose your destiny!"

      },
     
  ])
  .then(answers => {
   if(userHealth > 0 || zombieHealth > 0) {
        var zombieChoice = Math.floor(Math.random() * 5) + 1;
        var damage = Math.floor(Math.random() * 5) + 1;

        if (zombieChoice === parseInt(answers.destiny)) {
          console.log(zombieHealth)
          zombieHealth -= damage;
          console.log('Zombie is damaged, Zombie Health:' + zombieHealth)
          checkHealth()
        }
  
        else {
          console.log(userHealth)
          userHealth -= damage;
          console.log('User is damaged, User Health:' + userHealth  )
          checkHealth()
        }
   }
  });
  
}


play() 

