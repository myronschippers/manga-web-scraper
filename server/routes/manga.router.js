const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
// const mangaScrapper = require('../services/MangaScrapper');
// const logger = require('../utilities/logger');

const seriesList = [];

router.get('/series', (req, res, next) => {
  const queryText = `SELECT * FROM "series";`

  pool.query(queryText)
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
  const queryText = `INSERT INTO "series" ("path", "thumbnail", "title", "author", "created_at")
  VALUES ($1, $2, $3, $4, current_timestamp);`;
  const {
    path,
    thumbnail,
    title,
    author,
  } = seriesData;

  pool.query(queryText, [path, thumbnail, title, author])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('manga route series POST error: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
