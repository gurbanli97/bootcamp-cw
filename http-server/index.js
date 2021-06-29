const http  = require('http');

const fs = require('fs')
const server1 = http.createServer(function(req,res){

    var good = ['Your beautiful is true','I saw your face in a crowded place']
    var goodChoice = good[Math.floor(Math.random() * good.length)]
    res.writeHead(200,{
        'Content-type' : 'text/html',
    })

    res.end(
        `<h1>${goodChoice}</h1>`
     )

});


const server2 = http.createServer(function(req,res){

    var bad = ['and i dont now what to do','cause i"ll never be with you']

    var badChoice = bad[Math.floor(Math.random() * bad.length)]
    res.writeHead(200,{
        'Content-type' : 'text/html',
    })

    res.end(
       
        `<h1>${badChoice}</h1>`
    )

});

server1.listen(7004,function(){
    console.log('workin now!')
})

server2.listen(7504,function(){
    console.log('workin now!')
})