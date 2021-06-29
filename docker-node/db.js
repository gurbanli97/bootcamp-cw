var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bootcamp2021',
  database: 'ice_creamDB'
});
 

 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);

    insertProduct()
   
  });

  function insertProduct() {
    var newProduct = {flavor: 'banana', price: 3.00 ,quantity: 3};
    connection.query("Insert into products set ? " ,newProduct ,function(err, res) {
    
    });

    getProducts()
  }

  function getProducts() {
    
    connection.query("Select * from products" ,function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].flavor + " | " + res[i].price + " | " + res[i].quantity);
      }
    });

    updateProduct()
  }


  function updateProduct() {
    
    connection.query("Update  products set ? where ? ", [{flavor: 'pear'},{flavor:'banana'}] ,function(err, res) {
     
    });
    deleteProduct()
  }


  function deleteProduct() {
    
    connection.query("Delete from products where id =  ? ", [1] ,function(err, res) {
     
    });
  }

 