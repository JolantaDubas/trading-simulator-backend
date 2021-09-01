const express = require("express");
const dbConnection = require("./connections/db");

// połączenie z serwerenm
dbConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// tworzenie aplikacji express
const app = express();

// ustawienie uprawnień cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// parsowanie application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
// parsowanie application/json
app.use(express.json());

// zdefiniowanie routingów Api
app.use("/api/user", require("./api/user"));
app.use("/api/trade", require("./api/trade"));
app.use("/api/capital", require("./api/capital"));

// nasłuchiwanie połączenia
app.listen(process.env.PORT || 3000, () => console.log("server is Up"));

module.exports = app;
