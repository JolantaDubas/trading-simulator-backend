const Sequilize = require("sequelize");

const sequelize = new Sequilize(
  "heroku_3e0b90c08bb5909",
  "bd787ae584aba0",
  "99d14cad",
  {
    host: "us-cdbr-east-04.cleardb.com",
    port: "3306",
    dialect: "mysql",
    operatorsAliases: false,
  }
);

module.exports = sequelize;
global.sequelize = sequelize;
