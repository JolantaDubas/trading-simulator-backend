"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.createTable("trade", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      coin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(16, 6),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(16, 6),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      buy: {
        type: Sequelize.Boolean,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,

        references: {
          // This is a reference to another model
          model: User,

          // This is the column name of the referenced model
          key: "id",

          // This declares when to check the foreign key constraint. PostgreSQL only.
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      // price: {
      //   type: Sequelize.DECIMAL(16, 6),
      //   allowNull: false,
      // },
      // sell_price: {
      //   type: Sequelize.DECIMAL(16, 6),
      //   allowNull: true,
      // },
      // date: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // sell_date: {
      //   type: Sequelize.DATE,
      //   allowNull: true,
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
