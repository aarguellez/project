var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// load env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const contacts = require("./routes/contacts");
app.use("/contacts", contacts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const mongoose = require("mongoose");

// const user = process.env.MDB_USER;
// const passwd = process.env.MDB_PASSWORD;
mongoose
  .connect('mongodb+srv://IS445_User_1:IloveDB41@is445-project-6xtbv.mongodb.net/test')
  // .connect(`mongodb://IS445:Project@ds049888.mlab.com:49888/is445`)
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));



mongodb: module.exports = app;