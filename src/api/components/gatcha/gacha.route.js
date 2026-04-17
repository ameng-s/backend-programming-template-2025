const express = require('express');

const router = express.Router();
const controller = require('./gacha-controller');

module.exports = (app) => {
  app.use('/gacha', router);
  router.post('/', controller.kocokGacha);
};
