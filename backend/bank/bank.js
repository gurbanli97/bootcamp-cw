var fs = require("fs");
var operation = process.argv[2];
var amount = process.argv[3];
switch (operation) {
  case "total":
    total();
    break;

  case "deposit":
    deposit();
    break;

  case "withdraw":
    withdraw();
    break;

  case "lotto":
    lotto();
    break;
}

function total() {

  fs.readFile("bank.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.split(", ");
    var result = 0;

    for (var i = 0; i < data.length; i++) {
      if (parseFloat(data[i])) {
        result += parseFloat(data[i]);
      }
    }

    console.log("Total:" + result.toFixed(2));
  });
}

function deposit() {

  fs.appendFile("bank.txt", ", " + amount, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  console.log("Deposit:  " + amount + ".");
  total()
}

function withdraw() {
  fs.appendFile("bank.txt", ", -" + amount, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  console.log("Withdraw " + amount + ".");
  total()
}


function lotto() {

  fs.appendFile("bank.txt", ", -.25", function(err) {
    if (err) {
      return console.log(err);
    }
  });

  var lotNum = Math.floor((Math.random() * 5) + 1);

  if (lotNum === 1) {

    fs.appendFile("bank.txt", ", 25", function(err) {
      if (err) {
        return console.log(err);
      }
    });

    console.log("You won!");

  }
  else {
    console.log("Looser.You have lost 25 cents.");
  }
  total()
}


