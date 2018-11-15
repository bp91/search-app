//Server.js, don't forget to add express & ejs to packages
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();

console.log("DIRECTORY NAME: " + __dirname);

app.use(express.static(`${__dirname}/dist`)); // set the static files location for the static html
app.engine(".html", require('ejs').renderFile);
app.set("views", `${__dirname}/dist`);

router.get("/*", (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.use("/", router);
app.listen(port);
// catch 404 and forward to error handler
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
console.log("App running on port", port);