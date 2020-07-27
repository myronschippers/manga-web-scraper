const express = require('express');
const mangaSeriesDb = require('../services/MangaSeriesDb');
const logger = require('../utilities/logger');
const { RemoveCircleOutlineRounded } = require('@material-ui/icons');

const router = express.Router();

router.get('/series', (req, res, next) => {
  mangaSeriesDb.fetchAllSeries()
    .then((response) => {
      res.send(response);
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

router.get('/series/:id/chapters', (req, res, next) => {
  const seriesId = req.params.id;

  mangaSeriesDb.fetchSeriesChapters(seriesId)
    .then((seriesWithChapters) => {
      res.send(seriesWithChapters);
    })
    .catch((err) => {
      console.log('manga route series POST error: ', err);
      res.sendStatus(500);
    });
});

router.get('/chapter/:chapterId/pages', (req, res) => {
  const {
    chapterId
  } = req.params;

  mangaSeriesDb.fetchChapterWithPages(chapterId)
    .then((seriesWithChapters) => {
      res.send(seriesWithChapters);
    })
    .catch((err) => {
      console.log('manga route series POST error: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
