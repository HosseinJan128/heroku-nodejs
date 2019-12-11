var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');

var User = require('./api/models/userModel'),
  jsonwebtoken = require("jsonwebtoken");
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb'); 
mongoose.connect('mongodb://ufdocgznpjsg7w5zf5el:mwqTioOLfWNlmZIJ1msK@bj2m0zrcouystc1-mongodb.services.clever-cloud.commongodb://ufdocgznpjsg7w5zf5el:mwqTioOLfWNlmZIJ1msK@bj2m0zrcouystc1-mongodb.services.clever-cloud.com:27017/bj2m0zrcouystc1'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index.pug', {
    title: "Website",
 });
});

app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port, () => {
  console.log("App is running on port " + port);
});


console.log('todo list RESTful API server started on: ' + port);