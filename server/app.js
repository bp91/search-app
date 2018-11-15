var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./src/routes');
var log4js = require('log4js');

var log = log4js.getLogger("default");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));

// in questa sezione invece vado a definire i servizi REST realizzati, andandoli ad inserire come properties di app
routes.setRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  log.error("Something went wrong:", err);
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;