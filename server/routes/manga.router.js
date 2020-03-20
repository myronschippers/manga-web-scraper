const express = require('express');
const mangaSeriesDb = require('../services/MangaSeriesDb');

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
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('manga route series POST error: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
