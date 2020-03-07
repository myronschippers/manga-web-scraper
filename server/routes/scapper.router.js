const express = require('express');
// TODO: Create a Pool when this is ready to integrate with 
// const pool = require('../modules/pool');

const router = express.Router();
const mangaScrapper = require('../services/MangaScrapper');
const logger = require('../utilities/logger');

/**
 * GET route template
 */
router.get('/', (req, res, next) => {
    res.status(500);
    res.send({
        message: 'Route has not been completed yet.'
    });
});

/**
 * POST route template
 */
router.post('/search', (req, res, next) => {
    const {
        term,
    } = req.body;

    mangaScrapper.search(term)
        .then((results) => {
            logger.success('POST /api/scrape/search:', results);

            res.status(201)
            res.send(results);
        })
        .catch((err) => {
            logger.error('POST /api/scrape/search:', err);

            res.status(500);
            res.send({
                message: err
            });
        });
});

module.exports = router;