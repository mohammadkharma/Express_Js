const express = require('express');

// creating a route
const route = express.Router();

// applying middleware
route.use((req, res, next) => {
    console.log('router middleware is applied');
    next();
});

// setting up the route
route.get('/', (req, res) => {
    res.send('/ being hit');
});

route.get('/routerExample', (req, res) => {
    res.send('/routerExample being hit');
});



module.exports = route;