const express = require("express");
const router = express.Router();
const CapitalModel = require("../model/capitalModel");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
require("dotenv").config();
const { Op } = require("sequelize");

router.get("/list", function (req, res) {
  var userId = findId(req.headers.authorization);
  const { byCoin } = req.query;
  if (userId) {
    CapitalModel.findAll({
      where: {
        [Op.and]: [{ user_id: userId }, byCoin && { key: ["eur", byCoin] }],
      },
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

router.post("/create", function (req, res) {
  var userId = findId(req.headers.authorization);
  if (userId) {
    if ((key || symbol || amount || currency) === undefined) {
      res.status(404).json({
        message: "Fill All Fields",
        status: res.statusCode,
      });
    } else {
      CapitalModel.findId({
        where: {
          name: currency,
          user_id: userId,
        },
      }).then((value) => {
        console.log("capital", value);
      });

      CapitalModel.create({
        user_id: userId,
        name: currency,
        key: key,
        symbol: symbol,
        image: image,
        amount: amount,
      }).then((value) =>
        res.status(200).json({
          message: "success",
          data: value,
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

router.put("/update", function (req, res) {
  var tradeId = req.query.id;
  console.log("tradeId", tradeId);
  if (tradeId) {
    CapitalModel.update({
      where: {
        id: tradeId,
      },
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
      message: "Please enter ID",
    });
  }
});

router.delete("/delete", function (req, res) {
  var tradeId = req.query.id;
  console.log("tradeId", tradeId);
  if (tradeId) {
    CapitalModel.delete({
      where: {
        id: tradeId,
      },
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
      message: "Please enter ID",
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

module.exports = router;
