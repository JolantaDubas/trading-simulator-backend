const sequelize = require("../connections/db");

const { DataTypes, Model } = require("sequelize");
const User = require("./userModel");

class Capital extends Model {}

Capital.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(16, 6),
      allowNull: false,
    },
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
    modelName: "capital",
    sequelize,
    tableName: "capital",
    timestamps: false,
  }
);

module.exports = Capital;
