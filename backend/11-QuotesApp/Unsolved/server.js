var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'))
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bootcamp2021",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Express and MySQL code should go here.

app.get("/", function(req, res) {
  connection.query("SELECT * FROM quotes;", function(err, result) {
    if (err) {
      return err
    }
    res.render("index", { quotes: result });
  });
});


app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM quotes where id = ?", [req.params.id], function(err, data) {
    if (err) {
      return err
    }
    console.log(data)
    res.render("single-quote", data[0]);
  });
});


app.post("/create/quote", function(req, res) {
  connection.query("INSERT INTO quotes (author, quote) VALUES (?, ?)", [req.body.author, req.body.quote], function(
    err,
    result
  ) {
    if (err) {
      return err
    }

    res.json({ id: result.insertId });
  });
});


app.put("/update/quote/:id", function(req, res) {
  connection.query(
    "UPDATE quotes SET author = ?, quote = ? WHERE id = ?",
    [req.body.author, req.body.quote, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server faliure
        return err
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return err
      }
      res.status(200).end();

    }
  );
});

app.delete("/delete/quote/:id", function(req, res) {
  connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      return err
    }
    else if (result.affectedRows === 0) {
      return err
    }
    res.status(200).end();

  });
});



app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
