//1st  NPM Install + prompt + Inquierer

var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var filesystem = require('fs');

// create database connection 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Bamazon"

});

// Start the connection to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadID);
});

// call function 
buyProduct();

// call the function for buying a product (displays product, department, and quantity)
function buyProduct() {
    connection.query('SELECT * FROM products', function(err, res){
        for (var i=0; i < res.length; i++) {
            console.log('product: ' + res[i].department + 'Price: ' + res[i].Price + 'Stock: ' + res[i].quantity);
        }

    //prompts to question
    inquirer.prompt([{
        name: "choice",
        type : "rawlist",
        message: "What would you like to buy?",
        choices: function(valve) {
            var choiceArray = [] ;
            for (var i = 0 ; i < res.length; i++) {
                choiceArray.push(res[i].product);
            }
            return choiceArray;
    
        }
},{

// ask to enter a quantity
    name:"quantity",
    type:"input",
    message:"how many would you like to buy?",
    validate: function(value) {
        if (isNaN(value) == false) {
            return true;
        } else {
            return false;
        }
    }
}]).then(function(answer){
    for(var i = 0; i < res.length; i++) {
        if (res[i].product == answer.choice) {
            var chosenItem = res[i];
        }   
     }
// calculate remaining stock
     var updateStock = parseInt(chosenItem.quantity) - parseInt(answer.quantity);

// if customer tries to purchase more than availible stock, will be asked to make anoter purchase
     if (chosenItem.quantity < parseInt(answer.quantity)) {
         console.log("insufficient quantity!");
         again();
     }
// if we have the stock this will update the database and present the price to customer
     else {
         connection.query("UPDATE Products SET ? WHERE ?", [{quantity: updateStock}, {product: product.product}], function(err,res){
             console.log("Purchase sucessful!");
             
             var Total = (parseInt(answer.quantity)*product.Price).toFixed(2);
             console.log("Your total is $" + Total);

             again();
         });
     }
    });
});
}

// asks user if they want to purchase another item
function again() {
    inquirer.prompt({

    name: "repurchase",
    type: "list" ,
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
}).then(function(answer){
    if (answer.repurchase == "Yes") {
        buyProduct();
    }
    else {
        console.log("Thanks for shopping with us. Have a great day!")
    }
});
}