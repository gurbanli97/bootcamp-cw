const express = require('express');
const mongojs = require('mongojs');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const db = mongojs('mongodb://root:bootcamp2021@localhost:27017/zoo?authSource=admin');



app.get('/', (req,res) => {
    res.send('Hello World')
});


app.get("/all" , function(req,res) {
    db.animals.find({}, (err,data) => {
        res.json(data)
    })
}); 

app.get("/name", function(req, res) {
    var data = db.animals.find().sort({ name: 1 })

    res.json(data)
  });

app.listen(3000, () => {
    console.log('works on 3000')
})
