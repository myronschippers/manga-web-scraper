const express = require('express');
const mangaSeriesDb = require('../services/MangaSeriesDb');
const logger = require('../utilities/logger');

const router = express.Router();

router.get('/series', (req, res, next) => {
  mangaSeriesDb.fetchAllSeries()
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post('/series', (req, res, next) => {
  const seriesData = req.body;

  mangaSeriesDb.saveSeries(seriesData)
    .then((response) => {
      logger.message(response);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('manga route series POST error: ', err);
      res.sendStatus(500);
    });
});

router.get('/series/chapters/:id', (req, res, next) => {
  const seriesId = req.params.id;
})

module.exports = router;
