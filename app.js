// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

// const authRoutes = require("./routes/auth");
// const errorController = require("./controllers/error");

// var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();

//   // next(createError(404));
// });

// app.use("/auth", authRoutes);

// // error handler
// app.use(errorController.get404);

// app.use(errorController.get500);
// // app.use(function (err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get("env") === "development" ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render("error");
// // });

// module.exports = app;
const express = require("express");
// const express = require("body-parser");
const dbConnection = require("./connections/db");
const path = require("path");
var cors = require("cors");

// database connection
dbConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();

app.use(cors());
//use the public folder to serve web pages
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(express.json());

// api routes
app.use("/api/user", require("./api/user"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("server is Up"));

module.exports = app;
