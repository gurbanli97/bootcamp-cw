var mysql = require('mysql');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bootcamp2021',
  database: 'greatBay_DB'
});
 

 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);

    console.log('Succesfully connected!')

    startAuction()
  });


  function startAuction(){
      inquirer.prompt({
        name: "postOrBid",
        type: "list",
        message: "Would you like to POST or BID on an auction?",
        choices: ["POST", "BID"]
      })
      .then(function(answer){
        if(answer.postOrBid == "POST") {
            postAuction()
        }else{
            bidAuction()
        }
      })
  }



  function postAuction() {
      inquirer.prompt([
        {
          name: "item",
          type: "input",
          message: "Which item do you wanna place for an auction?"
        },
        {
            name: "category",
            type: "input",
            message: "Which category do you want this item belong to?"
        },
        {
            name: "startingBid",
            type: "input",
            message: "Write the starting bid for this item"
        }
    ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO auctions SET ?",
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid,
            highest_bid: answer.startingBid
          },
          function(err) {
            if (err){
                console.log('Some error')
            }else
            console.log("Your auction was created successfully!");
            startAuction();
          }
        );
      });
  }



  function bidAuction() {
      connection.query("SELECT * FROM auctions",function(err,res){
          if (err) {
              console.log('Oops! Something went wrong :( ',err)
          }else {
            function getItems(){
                var dbItems = []
                for(let i = 0; i < res.length; i++){
                    dbItems.push(res[i].item_name)
                }
                return dbItems
            }   


            inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: getItems(),
                    message: "Which item do you want to bid for? "
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                  }
            ])
            .then(function(answer){
                var chosenItem;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].item_name === answer.choice) {
                        chosenItem = res[j]
                    }
                  }


                  if(chosenItem.highest_bid <= parseInt(answer.bid)) {
                    connection.query(  "UPDATE auctions SET ? WHERE ?",
                    [
                          {
                            highest_bid: answer.bid
                          },
                          {
                            id: chosenItem.id
                          }
                        ],
                        function(err) {
                          if (err) {
                            console.log('Bid error')
                          } else {
                          console.log("Bid placed successfully!");
                          startAuction();
                          }
                        }
                      );
                  }else {
                      console.log('Bid is too low, please increase your bid')
                      bidAuction()
                  }
            })
        }
      })
     
  }

