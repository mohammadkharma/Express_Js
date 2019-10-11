const express = require('express');

// express is a nodejs framework that return a function that gives us much of methods to use in the app
const app = express();

// 'get()' method is for creating http server and it takes 2 params
// 1st param: the route, 2nd param: the http callback fun with 'req' & 'res' as it's params
app.get('/', (req, res)=>{
    res.send('hello world');
});

// routes
app.get('/example', (req, res)=>{
    res.send('you are in the example route');
});

// route params
// taking data from the client request object through the params property
// defined by colon (:)
// route params are for must-have data
app.get('/example/:name/:age', (req, res)=>{
    res.send(`${req.params.name}: ${req.params.age}`);
});

// query string params
// they are to receive data from thee client through the request
// they are an object with a property's name and it's value
// first query string param defined by a question mark
// the ampersand sign (&) is used to add another query string param
// example: localhost:3000/example/:name/:age?studies=params&sort=byAge
// route params are for optional-have data

app.listen(3000);
