
// express is a nodejs framework that return a function that gives us many methods to use in the app
const express = require('express');
const app = express();
const path = require('path'); // the 'path' module is helpful for sending files to the client
const bodyParser = require('body-parser'); // 'body-parser' is responsible for linking the form's data to the request body
const Joi = require('joi'); // 'joi' is for the user's input validation using 'schema'

// 'middleware' is the area between the request and the server where we can apply our code to the request before it reach the server
// 'use()' method is used for creating middleware func and takes 2 params: the route and a callback func
// when creating our own middleware func, 3 params are provided (req, res, next)
// 'next()' method tells the request that it finished proceeding the middleware and the request can continue it's way to the server or to the next middleware func
app.use('/', (req, res, next)=>{
    console.log(req.url, req.method);
    req.banana = 'banana'; // we can modify the req and res objects by adding properties to them
    next();
});

app.use('/public', express.static(path.join(__dirname, 'static'))); // changing the 'static' folder name to 'public' 

app.use(bodyParser.urlencoded({ extended: false })); // parsing data from the form
app.use(bodyParser.json()); // parsing data from the form as 'json'

app.set('view engine', 'ejs');

// 'get()' method is for creating http server and it takes 2 params
// 1st param: the route, 2nd param: the http callback fun with 'req' & 'res' as it's params
// 'sendFile()' method is used for sending any kind of static files (html, video, json...) to the client
app.get('/:userQuery', (req, res) => {
    // res.sendFile(path.join(__dirname, 'static', 'index.html'));
    
    // rendering 'ejs' dynamic file using 'render' method that takes two params
    // 1st param: the file of the name which should be located in a folder that we create and name it 'views' that has a copy of our 'index.html' file but with 'ejs' extension
    // 2nd param: an object the data we want to use in the 'ejs' file
    res.render('index', { data: {
        userQuery : req.params.userQuery,
        searchResults : ['kids', 'drama', 'real story'],
        loggedIn : true,
        username : 'king kong'
    }});
});

// 'post()' method is for posting the client's form data to the server using the body parser and it takes 2 params
// 1st param: the route, 2nd param: the http callback fun with 'req' & 'res' as it's params

// routes:
// app.get('/example', (req, res)=>{
//     res.send('you are in the example route');
// });

// route params:
// taking data from the client request object through the params property
// defined by colon (:)
// route params are for must-have data
// app.get('/example/:name/:age', (req, res)=>{
//     res.send(`${req.params.name}: ${req.params.age}`);
// });

// query string params
// they are to receive data from the client through the request
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

    // res.json({success : true});

    // 'schema' is a blue print for the validation of the form's data
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required()
    });
    // running the schema rules using 'validate' method which takes 3 params
    // 1st param: the object that schema should applied on (req.body)
    // 2nd param: the schema itself
    // 3rd param: callback fun with err and result as params
    Joi.validate(req.body, schema, (err, result) => {
        if (err) {
            console.log(err);
            res.send('an error occurred');
        }
        console.log(result);
        res.send('data posted successfully')
    });
});

// schema for an objects and arrays:
// const arrayString = ['banana', 'apple', 'orange'];
// const arrayObject = [{example: 'example1'}, {example: 'example2'}, {example: 'example3'}];
// const userInput = {
//     personalInfo: {
//         age: '22',
//         city: 'berlin',
//         state: 'f1'
//     },
//     preferences: arrayString
//     // preferences: arrayObject
// };

// const personalInfoSchema = Joi.object().keys({
//     age: Joi.string().trim().required(),
//     city: Joi.string().trim().required(),
//     state: Joi.string().trim().length(2).required()
// });

// const preferencesSchema = Joi.array().items(Joi.string()); // applying schema on array of string
// const preferencesSchema = Joi.array().items(Joi.object().key({ // applying schema on array of objects
//     example : Joi.string().required()
// }));

// const schema = Joi.object().keys({
//     personalInfo: personalInfoSchema,
//     preferences: preferencesSchema
// });

// Joi.validate(userInput, schema, (err, result) => {
//     if (err)
//         console.log(err);
//     else
//         console.log(result);
// });

app.listen(3000);
