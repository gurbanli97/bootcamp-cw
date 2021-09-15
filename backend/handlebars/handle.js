const express = require('express')

const handlebars = require('express-handlebars')

const path = require('path')


const app = express()


const PORT = 3000
app.engine('handlebars',handlebars({
    defaultLayout: 'main'
}));

app.set("view engine", "handlebars");
app.set('views',path.join(__dirname, 'views'));



var icecreams = [
    { name: "vanilla", price: 10, awesomeness: 3 },
    { name: "chocolate", price: 4, awesomeness: 8 },
    { name: "banana", price: 1, awesomeness: 1 },
    { name: "greentea", price: 5, awesomeness: 7 },
    { name: "mint", price: 10, awesomeness: 10 }
  ];


app.get('/icecreams',function(req,res){
    res.render('icecreams',{icecreams});
})


app.get("/icecream/:name", function(req, res) {
    for (var i = 0; i < icecreams.length; i++) {
      if (icecreams[i].name === req.params.name) {
        return res.render("icecream-name", icecreams[i]);
      }
    }
  });



  app.listen(PORT)