var inquirer = require('inquirer');
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  // query the database for all items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            console.log("\n");
            console.log("================ Welcome to BAMAZON ====================");
            console.log("Take a look below for the items we have for sale:")
            for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id, results[i].product_name, results[i].price);
              choiceArray.push(results[i].product_name);
            }
            console.log("========================================================");
            return choiceArray;
          },

          message: "What are you interested in buying?"
        },
        {
          name: "sale",
          type: "input",
          message: "How many would you like to add to your cart?"
        }
      ])
      .then(function(answer) {
      	// console.log("Does this work?");
      	// console.log(results);
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
        	// console.log(answer.choice, results[i].product_name);
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if store has enough of chosen item in stock
        if (chosenItem.stock_quantity > parseInt(answer.sale)) {
        	// console.log(chosenItem.stock_quantity, answer.sale, " This is what we want");
          // stock quantity was high enough, so update db, let the user know, and start over
          var newQuantity = chosenItem.stock_quantity-parseInt(answer.sale);
          // console.log(newQuantity + "This is the new quantity");
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQuantity
              },
              {
                item_id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              var grandTotal = chosenItem.price*answer.sale;
              console.log("=============================================");
              console.log("\n");
              console.log("Item successfully purchased!");
              console.log("\n");
              console.log("Your grand total is: " + grandTotal);
              console.log("\n");
              console.log("=============================================");
              keepShopping();
            }
          );
        }
        else {
          // stock quantity wasn't high enough, so apologize and start over
          console.log("=============================================");
          console.log("\n");
          console.log("We apologize... We don't have a sufficient amount of " + chosenItem.product_name + "(s) to complete your order. Try again.");
          keepShopping();
        }
      });
  });
}

function keepShopping() {
	inquirer
		.prompt([
		{
			type: "confirm",
			name: "startOver",
			message: "Would you like to keep shopping?"
		}
	]).then(function(answer) {
		// console.log(answer.startOver)
		if (answer.startOver) {

			start();
		}
		console.log("Thank you for shopping! Please come again!");
	})
}
