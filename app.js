const express = require('express');

// express is a nodejs framework that return a function that gives us much of methods to use in the app
const app = express();

// the 'path' module is helpful for sending files to the client
const path = require('path');

// 'use()' method is used when middleware func is needed

// 'body-parser' is responsible for linking the form data to the request body
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })); // parsing data from the form
app.use(bodyParser.json()); // parsing data from the form
app.use('/public', express.static(path.join(__dirname, 'static'))); // changing the 'static' folder name to 'public' 

// 'get()' method is for creating http server and it takes 2 params
// 1st param: the route, 2nd param: the http callback fun with 'req' & 'res' as it's params
// 'sendFile()' method is used for sending any kind of static files (html, video, json...)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// 'post()' method is for posting the client's form data to the server using the body parser and it takes 2 params
// 1st param: the route, 2nd param: the http callback fun with 'req' & 'res' as it's params

// routes
// app.get('/example', (req, res)=>{
//     res.send('you are in the example route');
// });

// route params
// taking data from the client request object through the params property
// defined by colon (:)
// route params are for must-have data
// app.get('/example/:name/:age', (req, res)=>{
//     res.send(`${req.params.name}: ${req.params.age}`);
// });

// query string params
// they are to receive data from thee client through the request
// they are an object with a property's name and it's value
// first query string param defined by a question mark
// the ampersand sign (&) is used to add another query string param
// example: localhost:3000/example/:name/:age?studies=params&sort=byAge
// route params are for optional-have data

app.post('/', (req, res) => {
    // req.body return an object with email and password from the client form
    console.log(req.body);
    // database work here
    // res.send('successfully posted data');
    res.json({success : true});
});


app.listen(3000);
