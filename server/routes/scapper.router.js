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
          console.log('Error scraping series chapters:', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('Error fetching series chapters:', err);
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
      // logger.success('POST /api/scrape/search:', results);

      res.status(201);
      res.send(results);
    })
    .catch((err) => {
      // logger.error('POST /api/scrape/search:', err);

      res.status(500);
      res.send({
        message: err,
      });
    });
});

router.post('/chapters', (req, res) => {
  const seriesData = req.body;
  logger.message('seriesData:');
  console.log(seriesData);

  mangaScraper
    .chaptersForSeries(seriesData)
    .then((scraperResp) => {
      logger.message('seriesData:');
      console.log(scraperResp);

      mangaSeriesDb
        .saveAllChapters(scraperResp, seriesData)
        .then((dbResp) => {
          logger.message('dbResp:', dbResp);

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
      logger.error('catch scraper.router.post.chapters:', err);
      res.status(500);
      res.send({
        errorMsg: `Failed to scrape chapters for ${seriesData.title}`,
      });
    });
});

router.post('/refresh/pages', (req, res) => {
  const chapterData = req.body;

  mangaScraper
    .pagesForChapter(chapterData)
    .then((scraperResp) => {
      res.status(201);
      res.send(scraperResp);

      // TODO - save to DB instead of sending back data
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

module.exports = router;
