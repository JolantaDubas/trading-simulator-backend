const sequelize = require("../connections/db");

const { DataTypes, Model } = require("sequelize");
const User = require("./userModel");

class Trade extends Model {}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    coin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(16, 6),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(16, 6),
      allowNull: false,
    },
    // sell_price: {
    //   type: DataTypes.DECIMAL(16, 6),
    //   allowNull: true,
    // },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    buy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // sell_date: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    user_id: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: User,

        // This is the column name of the referenced model
        key: "id",

        // This declares when to check the foreign key constraint. PostgreSQL only.
      },
    },
  },
  {
    modelName: "trade",
    sequelize,
    tableName: "trade",
    timestamps: false,
  }
);
// Trade.belongsTo(User);
// Trainer.hasMany(Series);
module.exports = Trade;
