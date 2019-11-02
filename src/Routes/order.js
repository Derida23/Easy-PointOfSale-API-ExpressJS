const express = require('express');
const controller = require('../Controllers/order')

const Router = express.Router();

Router.post('/add', controller.addProduct);
Router.post('/reduce', controller.reduceProduct);

module.exports = Router;
