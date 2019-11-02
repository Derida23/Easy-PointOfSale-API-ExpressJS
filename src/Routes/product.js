const express = require('express');
const controller = require('../Controllers/product')

const Router = express.Router();

Router.get('/', controller.getProduct);
Router.get('/:id', controller.getProductId);
Router.post('/', controller.postProduct);
Router.put('/:id', controller.putProduct);
Router.delete('/:id', controller.deleteProduct);

module.exports = Router;
