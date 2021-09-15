const express = require('express')
const mysql = require('mysql')
const handlebars = require('express-handlebars')

const path = require('path')

var app = express();

app.use(express.urlencoded({extended: true}))

app.use(express.json())

const PORT = 3000;


var hb = require("express-handlebars");

app.engine("handlebars", hb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bootcamp2021',
    database: 'wishes_db'
  });


  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });


  app.get('/',function(req,res){
      connection.query('SELECT * FROM wishes',function(err,result){
          if(err){
             return err
          }

          res.render('wishes',{wishes : result})

      })
  })
  


  app.post("/", function(req, res) {
      console.log(req.body)
    connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
      if (err) {
        return err;
      }
  
      res.redirect("/");
    });
  });



app.listen(PORT,function(req,res){
    console.log('Works On Port ' + PORT)
})