const express = require('express');
// TODO: Create a Pool when this is ready to integrate with 
// const pool = require('../modules/pool');

const router = express.Router();
// const mangaScrapper = require('../services/MangaScrapper');
// const logger = require('../utilities/logger');

const seriesList = [];

router.get('/series', (req, res, next) => {
  res.send(seriesList);
});

router.post('/series', (req, res, next) => {
  const seriesData = req.body;
  seriesList.push(seriesData);

  res.sendStatus(201);
});

module.exports = router;
