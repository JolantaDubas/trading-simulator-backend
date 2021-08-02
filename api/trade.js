const express = require("express");
const router = express.Router();
const TradeModel = require("../model/tradeModel");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
const CapitalModel = require("../model/capitalModel");
const { findOrCreate, findOrBuild } = require("../model/tradeModel");
require("dotenv").config();
const { Op } = require("sequelize");

router.post("/create", function (req, res) {
  const { coin, currency, key, symbol, image, amount, price, date, buy } =
    req.body;
  var userId = findId(req.headers.authorization);
  if (userId) {
    if (
      (coin || key || currency || amount || price || date || buy) === undefined
    ) {
      res.status(404).json({
        message: "Fill All Fields",
        status: res.statusCode,
      });
    } else {
      if (buy) {
        //create new capital if not exist
        CapitalModel.findOrCreate({
          where: { user_id: userId, key: key },
          defaults: {
            name: coin,
            key: key,
            symbol: symbol,
            image: image,
            amount: amount,
            user_id: userId,
          },
        });
        // change amount of usd capital
        // if buy
        console.log("findOrCreate", findOrCreate),
          CapitalModel.increment([`amount`], {
            by: amount,
            where: { user_id: userId, key: key },
          });
        CapitalModel.decrement([`amount`], {
          by: amount * price,
          where: { user_id: userId, key: currency },
        });
      } else {
        //if sell
        CapitalModel.increment([`amount`], {
          by: amount * price,
          where: { user_id: userId, key: currency },
        });
        CapitalModel.decrement([`amount`], {
          by: amount,
          where: { user_id: userId, key: key },
        });
      }
      //create trade
      TradeModel.create({
        user_id: userId,
        coin: coin,
        key: key,
        currency: currency,
        amount: amount,
        price: price,
        date: date,
        buy: buy,
      }).then((value) =>
        res.status(201).json({
          message: "Trade successfully added",
          status: res.statusCode,
        })
      );
    }
  } else {
    res.status(401).json({
      status: res.statusCode,
      message: "Please Login",
    });
  }
});

router.get("/list", function (req, res) {
  const { byCoin } = req.query;
  console.log("trade req body", req.query);
  var userId = findId(req.headers.authorization);
  if (userId) {
    TradeModel.findAll({
      where: {
        //  coin: byCoin,

        [Op.and]: [
          { user_id: userId },
          byCoin && { key: byCoin },
          //  { order: [["date", "DESC"]] },
        ],
      },
      order: [["date", "DESC"]],
    }).then((value) =>
      res.status(200).json({
        message: "success",
        data: value,
        status: res.statusCode,
      })
    );
  } else {
    res.status(401).json({
      status: res.statusCode,
      message: "Please Login",
    });
  }
});

function findId(bearer) {
  const authHeader = bearer;
  if (authHeader) {
    const token = authHeader.substr("Bearer".length + 1);
    var userId = webToken.verify(token, process.env.secret_key, (err, user) => {
      return user.id;
    });
    return userId;
  }
  return null;
}

function updateCapital(coin, currency, amount, price, userId) {
  if (buy) {
    CapitalModel.increment([amount], {
      by: amount,
      where: { user_id: userId, currency: coin },
    });
    CapitalModel.decrement([amount], {
      by: amount * price,
      where: { user_id: userId, currency: currency },
    });
  } else {
    CapitalModel.increment([amount], {
      by: amount,
      where: { user_id: userId, currency: currency },
    });
    CapitalModel.decrement([amount], {
      by: amount / price,
      where: { user_id: userId, currency: currency },
    });
  }
}

module.exports = router;
