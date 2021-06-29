const http = require('http')
const fs = require('fs')



var port = 8083;

var server = http.createServer(handleRequest);


function handleRequest(req,res){

    var url = req.url
    
    switch(url) {
        case '/food' : 

        return fs.readFile(__dirname + '/foodd.html',function(err,data){
            if(err){
                console.log(err)
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
           
        })

        case '/frameworks' : 

        return fs.readFile(__dirname + '/frameworks.html',function(err,data){
            if(err){
                console.log(err)
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        })

        case '/home' : 

        return fs.readFile(__dirname + '/home.html',function(err,data){
            if(err){
                console.log(err)
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        })

        case '/movies' : 

        return fs.readFile(__dirname + '/movies.html',function(err,data){
            if(err){
                console.log(err)
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        })



        default: 

        return fs.readFile(__dirname + '/home.html',function(err,data){
            if(err){
                console.log(err)
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        })
    }
}


server.listen(port, function() {
    console.log("Server using  PORT: " + port);
  });