const Sequilize = require("sequelize");

const sequelize = new Sequilize("tradingapp", "root", "root", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;
