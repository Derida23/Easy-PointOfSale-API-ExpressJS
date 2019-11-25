const express = require('express');
const product = require ('./product');
const category = require ('./category');
const order = require ('./order');
const user = require('./user')
const jwt = require('jsonwebtoken')
const form = require('../Helpers/form')
const secretKey = process.env.SECRET_KEY || 270400;

const Router = express.Router();

const validateUser = (req, res, next) => {
    jwt.verify(req.headers['x-access-token'], secretKey, (err, decoded) => {
      if (err) {
        form.error(res, err.message);
      }else{
        req.body.user_id = decoded.id;
        next();
      }
    });
  }

Router.get('/', (req, res) => {
    res.json({
        message: "Welcome to RESTfull API for Point of Sale",
        author: "@Derida23",
        documentation: "https://github.com/Derida23/PointOfSale-ExpressJS-API",
        github: "github.com/Derida23"
    });
})

Router.use('/product', product);
Router.use('/category', category);
Router.use('/order', order);
Router.use('/user', user)

module.exports = Router;
