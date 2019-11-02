const express = require('express');
const controller = require('../Controllers/category')

const Router = express.Router();

Router.get('/', controller.getCategory);
Router.get('/:id', controller.getCategoryId);
Router.post('/', controller.postCategory);
Router.put('/:id', controller.putCategory);
Router.delete('/:id', controller.deleteCategory);

module.exports = Router;
