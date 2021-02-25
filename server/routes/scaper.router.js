const express = require('express');
// TODO: Create a Pool when this is ready to integrate with
// const pool = require('../modules/pool');

const router = express.Router();
const mangaScraper = require('../services/MangaScraper');
const mangaSeriesDb = require('../services/MangaSeriesDb');
const logger = require('../utilities/logger');

/**
 * GET route for pulling all of the saved manga series
 */
router.get('/chapters/:seriesId', (req, res, next) => {
  // const seriesId = req.params.seriesId;
  mangaSeriesDb
    .fetchSeries(req.params.seriesId)
    .then((response) => {
      const matchedSeries = response.rows[0];

      mangaScraper
        .chaptersForSeries(matchedSeries)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          logger.error('GET /api/scraper/chapters/:seriesId ERROR:', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      logger.error('GET /api/scraper/chapters/:seriesId ERROR:', err);
      res.sendStatus(500);
    });
});

/**
 * POST route that searches for a manga series
 * based on key term sent
 */
router.post('/search', (req, res, next) => {
  const { term } = req.body;

  mangaScraper
    .search(term)
    .then((results) => {
      res.status(201);
      res.send(results);
    })
    .catch((err) => {
      logger.error('POST /api/scrape/search ERROR:', err);

      res.status(500);
      res.send({
        message: err,
      });
    });
});

router.post('/chapters', (req, res) => {
  const seriesData = req.body;

  mangaScraper
    .chaptersForSeries(seriesData)
    .then((scraperResp) => {
      // Save Chapter data to the DB
      mangaSeriesDb
        .saveAllChapters(scraperResp, seriesData)
        .then((dbResp) => {
          res.status(201);
          res.send(dbResp);
        })
        .catch((err) => {
          logger.error(err);

          res.status(500);
          res.send(err);
        });
    })
    .catch((err) => {
      logger.error('POST /api/scraper/chapters ERROR:', err);

      res.status(500);
      res.send({
        errorMsg: `Failed to scrape chapters for ${seriesData.title}`,
      });
    });
});

router.post('/chapter/pages', (req, res) => {
  const chapterData = req.body;
  // {
  //   id: 1,
  //   name: '',
  //   path: '',
  //   sequence: 1,
  //   title: '',
  //   created_at: '',
  //   series_id: 1,
  //   is_read: false,
  // }

  mangaScraper
    .pagesForChapter(chapterData)
    .then((scraperResp) => {
      res.status(201);
      res.send(scraperResp);

      // TODO - save to DB instead of sending back data
    })
    .catch((err) => {
      logger.error('POST /api/scraper/chapter/pages ERROR:', err);

      res.status(500);
      res.send(err);
    });
});

module.exports = router;
