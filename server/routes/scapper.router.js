const express = require('express');
// TODO: Create a Pool when this is ready to integrate with 
// const pool = require('../modules/pool');

const router = express.Router();
const mangaScrapper = require('../services/MangaScrapper');

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

    mangaScrapper.search(term);

    res.status(500);
    res.send({
        message: 'Route has not been completed yet.'
    });
});

module.exports = router;