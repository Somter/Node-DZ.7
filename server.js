var express = require('express');
var path  = require('path');
var bodyparser  = require('body-parser');
var fs = require('fs');   

var app = express();  
const par = bodyparser.urlencoded({extended:false,}); 

function wqriteFile(email, login, password, confirm, attempts = 0) {
    var data = {
        email: email,
        login: login,
        password: password,
        confirm: confirm,
        attempts: attempts 
    };

    var dataJson = JSON.stringify(data, null, 2);

    fs.writeFile('data.txt', dataJson, (err) => {
        if(err){
            console.log('Ошибка при записи данных в файл!');
        }
        else{
            console.log('Данные успешно записаны в файл');
        }
    });
}


function ReadFile(callback) {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Ошибка при чтении файла!');
            callback(err, null); 
        } else {
            try {
                const jsonData = JSON.parse(data);  
                callback(null, jsonData);  
            } catch (parseErr) {
                console.log('Ошибка при парсинге JSON!');
                callback(parseErr, null);  
            }
        }
    });
}



app.post('/register', par, function(request, response){
    console.log('post');
    console.log(request.url);
    let emailStr = request.body.email;
    let loginStr = request.body.login;
    let passwordStr = request.body.password;
    let confirmPassword = request.body.password;
    wqriteFile(emailStr, loginStr, passwordStr, confirmPassword);
    response.send('<h1>Вы успешно зарегестрировались!</h1>');
});

app.post('/login', par, function(request, response) {
    console.log('post2');
    console.log(request.url);

    let loginCheck = request.body.username;
    let passwordCheck = request.body.password;

    ReadFile((err, jsonData) => {
        if (err) {
            response.send('<h1>Ошибка при чтении данных!</h1>');
        } else {
            if (jsonData.login === loginCheck && jsonData.password === passwordCheck) {
                response.send(`<h1>Вы успешно вошли! Количество попыток входа: ${jsonData.attempts}</h1>`);
                jsonData.attempts = 0; 
                fs.writeFile('data.txt', JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        console.log('Ошибка при обновлении файла!');
                    }
                });
            } else {
                jsonData.attempts += 1;
                response.send(`<h1>Вы ввели неверные данные! Попытка №${jsonData.attempts}</h1>`);
                
                fs.writeFile('data.txt', JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        console.log('Ошибка при обновлении файла!');
                    }
                });
            }
        }
    });
});


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