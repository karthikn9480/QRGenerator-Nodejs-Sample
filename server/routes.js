//routes.js

const express = require('express');
const controller = require('./controller');

const routes = express.Router();

routes.post('/generateQR', controller.generateQR);

module.exports = routes;
