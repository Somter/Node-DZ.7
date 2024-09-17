var express = require('express');
var path  = require('path');

var app = express();   

app.get('/', function(request, response){
    console.log(request.url);   
    response.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/home', function(request, response){
    console.log(request.url);   
    response.sendFile(path.join(__dirname, '/home.html'));
});


app.get('/news', function(request, response){
    console.log(request.url);   
    response.sendFile(path.join(__dirname, '/news.html'));
});


app.get('/about', function(request, response){
    console.log(request.url);   
    response.sendFile(path.join(__dirname, '/about.html'));
});


app.get('/reg', function(request, response){
    console.log(request.url);   
    response.sendFile(path.join(__dirname, '/regts.html'));
});


app.get('/entr', function(request, response){
    console.log(request.url);   
    response.sendFile(path.join(__dirname, '/entranc.html'));
});


app.listen(8080, function(){
    console.log('server start on port 8080');
})